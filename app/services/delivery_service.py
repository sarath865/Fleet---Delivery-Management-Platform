from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.delivery import Delivery
from app.models.driver import Driver
from app.models.vehicle import Vehicle

from app.schemas.delivery import (
    DeliveryCreate,
    DeliveryUpdate,
)


def create_delivery(
    db: Session,
    delivery: DeliveryCreate,
):
    existing_delivery = (
        db.query(Delivery)
        .filter(
            Delivery.order_number == delivery.order_number
        )
        .first()
    )

    if existing_delivery:
        raise HTTPException(
            status_code=400,
            detail="Order number already exists.",
        )

    driver = (
        db.query(Driver)
        .filter(Driver.id == delivery.driver_id)
        .first()
    )

    if not driver:
        raise HTTPException(
            status_code=404,
            detail="Driver not found.",
        )

    vehicle = (
        db.query(Vehicle)
        .filter(Vehicle.id == delivery.vehicle_id)
        .first()
    )

    if not vehicle:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found.",
        )

    new_delivery = Delivery(
        **delivery.model_dump()
    )

    db.add(new_delivery)
    db.commit()
    db.refresh(new_delivery)

    return new_delivery


def get_all_deliveries(db: Session):
    return db.query(Delivery).all()


def get_delivery_by_id(
    db: Session,
    delivery_id: int,
):
    delivery = (
        db.query(Delivery)
        .filter(Delivery.id == delivery_id)
        .first()
    )

    if not delivery:
        raise HTTPException(
            status_code=404,
            detail="Delivery not found.",
        )

    return delivery


def update_delivery(
    db: Session,
    delivery_id: int,
    delivery_data: DeliveryUpdate,
):
    delivery = get_delivery_by_id(
        db,
        delivery_id,
    )

    update_data = delivery_data.model_dump(
        exclude_unset=True
    )

    if "driver_id" in update_data:
        driver = (
            db.query(Driver)
            .filter(
                Driver.id == update_data["driver_id"]
            )
            .first()
        )

        if not driver:
            raise HTTPException(
                status_code=404,
                detail="Driver not found.",
            )

    if "vehicle_id" in update_data:
        vehicle = (
            db.query(Vehicle)
            .filter(
                Vehicle.id == update_data["vehicle_id"]
            )
            .first()
        )

        if not vehicle:
            raise HTTPException(
                status_code=404,
                detail="Vehicle not found.",
            )

    for key, value in update_data.items():
        setattr(delivery, key, value)

    db.commit()
    db.refresh(delivery)

    return delivery


def delete_delivery(
    db: Session,
    delivery_id: int,
):
    delivery = get_delivery_by_id(
        db,
        delivery_id,
    )

    db.delete(delivery)
    db.commit()

    return {
        "message": "Delivery deleted successfully."
    }