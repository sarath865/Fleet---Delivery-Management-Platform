from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_admin

from app.schemas.delivery import (
    DeliveryCreate,
    DeliveryUpdate,
    DeliveryResponse,
)

from app.services.delivery_service import (
    create_delivery,
    get_all_deliveries,
    get_delivery_by_id,
    update_delivery,
    delete_delivery,
)


router = APIRouter(
    prefix="/deliveries",
    tags=["Deliveries"],
)


@router.post(
    "/",
    response_model=DeliveryResponse,
    status_code=201,
)
def create_delivery_api(
    delivery: DeliveryCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    return create_delivery(
        db,
        delivery,
    )


@router.get(
    "/",
    response_model=list[DeliveryResponse],
)
def get_deliveries_api(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    return get_all_deliveries(db)


@router.get(
    "/{delivery_id}",
    response_model=DeliveryResponse,
)
def get_delivery_api(
    delivery_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    return get_delivery_by_id(
        db,
        delivery_id,
    )


@router.put(
    "/{delivery_id}",
    response_model=DeliveryResponse,
)
def update_delivery_api(
    delivery_id: int,
    delivery: DeliveryUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    return update_delivery(
        db,
        delivery_id,
        delivery,
    )


@router.delete("/{delivery_id}")
def delete_delivery_api(
    delivery_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    return delete_delivery(
        db,
        delivery_id,
    )