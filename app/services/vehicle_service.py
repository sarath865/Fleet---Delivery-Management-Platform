from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.vehicle import Vehicle
from app.models.delivery import Delivery
from app.schemas.vehicle import VehicleCreate, VehicleUpdate


def create_vehicle(db: Session, vehicle: VehicleCreate):

    existing = (
        db.query(Vehicle)
        .filter(Vehicle.vehicle_number == vehicle.vehicle_number)
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Vehicle number already exists."
        )

    new_vehicle = Vehicle(**vehicle.model_dump())

    db.add(new_vehicle)
    db.commit()
    db.refresh(new_vehicle)

    return new_vehicle


def get_all_vehicles(db: Session):
    return db.query(Vehicle).all()


def get_vehicle_by_id(db: Session, vehicle_id: int):

    vehicle = (
        db.query(Vehicle)
        .filter(Vehicle.id == vehicle_id)
        .first()
    )

    if not vehicle:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found."
        )

    return vehicle


def update_vehicle(
    db: Session,
    vehicle_id: int,
    vehicle_data: VehicleUpdate,
):

    vehicle = get_vehicle_by_id(db, vehicle_id)

    update_data = vehicle_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(vehicle, key, value)

    db.commit()
    db.refresh(vehicle)

    return vehicle


def delete_vehicle(
    db: Session,
    vehicle_id: int,
):

    vehicle = get_vehicle_by_id(db, vehicle_id)

    assigned_delivery = (
        db.query(Delivery)
        .filter(Delivery.vehicle_id == vehicle_id)
        .first()
    )

    if assigned_delivery:
        raise HTTPException(
            status_code=400,
            detail=(
                "Cannot delete this vehicle because the vehicle "
                "is assigned to an existing delivery."
            ),
        )

    db.delete(vehicle)
    db.commit()

    return {
        "message": "Vehicle deleted successfully."
    }