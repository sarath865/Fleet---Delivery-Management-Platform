from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.driver import Driver
from app.models.delivery import Delivery
from app.schemas.driver import DriverCreate, DriverUpdate


def create_driver(db: Session, driver: DriverCreate):
    existing_license = (
        db.query(Driver)
        .filter(Driver.license_number == driver.license_number)
        .first()
    )

    if existing_license:
        raise HTTPException(
            status_code=400,
            detail="License number already exists."
        )

    existing_phone = (
        db.query(Driver)
        .filter(Driver.phone_number == driver.phone_number)
        .first()
    )

    if existing_phone:
        raise HTTPException(
            status_code=400,
            detail="Phone number already exists."
        )

    new_driver = Driver(**driver.model_dump())

    db.add(new_driver)
    db.commit()
    db.refresh(new_driver)

    return new_driver


def get_all_drivers(db: Session):
    return db.query(Driver).all()


def get_driver_by_id(db: Session, driver_id: int):
    driver = (
        db.query(Driver)
        .filter(Driver.id == driver_id)
        .first()
    )

    if not driver:
        raise HTTPException(
            status_code=404,
            detail="Driver not found."
        )

    return driver


def update_driver(
    db: Session,
    driver_id: int,
    driver_data: DriverUpdate,
):
    driver = get_driver_by_id(db, driver_id)

    update_data = driver_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(driver, key, value)

    db.commit()
    db.refresh(driver)

    return driver


def delete_driver(
    db: Session,
    driver_id: int,
):
    driver = get_driver_by_id(db, driver_id)

    assigned_delivery = (
        db.query(Delivery)
        .filter(Delivery.driver_id == driver_id)
        .first()
    )

    if assigned_delivery:
        raise HTTPException(
            status_code=400,
            detail=(
                "Cannot delete this driver because the driver "
                "is assigned to an existing delivery."
            ),
        )

    db.delete(driver)
    db.commit()

    return {
        "message": "Driver deleted successfully."
    }