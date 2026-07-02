from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.driver import (
    DriverCreate,
    DriverUpdate,
    DriverResponse,
)
from app.services.driver_service import (
    create_driver,
    get_all_drivers,
    get_driver_by_id,
    update_driver,
    delete_driver,
)
from app.dependencies.auth import get_current_admin

router = APIRouter(
    prefix="/drivers",
    tags=["Drivers"],
)


@router.post("/", response_model=DriverResponse, status_code=201)
def create_driver_api(
    driver: DriverCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    return create_driver(db, driver)


@router.get("/", response_model=list[DriverResponse])
def get_drivers_api(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    return get_all_drivers(db)


@router.get("/{driver_id}", response_model=DriverResponse)
def get_driver_api(
    driver_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    return get_driver_by_id(db, driver_id)


@router.put("/{driver_id}", response_model=DriverResponse)
def update_driver_api(
    driver_id: int,
    driver: DriverUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    return update_driver(
        db,
        driver_id,
        driver,
    )


@router.delete("/{driver_id}")
def delete_driver_api(
    driver_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    return delete_driver(
        db,
        driver_id,
    )