from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_admin

from app.schemas.vehicle import (
    VehicleCreate,
    VehicleUpdate,
    VehicleResponse,
)

from app.services.vehicle_service import (
    create_vehicle,
    get_all_vehicles,
    get_vehicle_by_id,
    update_vehicle,
    delete_vehicle,
)

router = APIRouter(
    prefix="/vehicles",
    tags=["Vehicles"],
)


@router.post("/", response_model=VehicleResponse, status_code=201)
def create_vehicle_api(
    vehicle: VehicleCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    return create_vehicle(db, vehicle)


@router.get("/", response_model=list[VehicleResponse])
def get_vehicles_api(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    return get_all_vehicles(db)


@router.get("/{vehicle_id}", response_model=VehicleResponse)
def get_vehicle_api(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    return get_vehicle_by_id(db, vehicle_id)


@router.put("/{vehicle_id}", response_model=VehicleResponse)
def update_vehicle_api(
    vehicle_id: int,
    vehicle: VehicleUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    return update_vehicle(
        db,
        vehicle_id,
        vehicle,
    )


@router.delete("/{vehicle_id}")
def delete_vehicle_api(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    return delete_vehicle(
        db,
        vehicle_id,
    )