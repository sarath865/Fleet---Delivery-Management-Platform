from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user

from app.models.delivery import Delivery
from app.models.tracking import Tracking

from app.schemas.tracking import TrackingCreate, TrackingResponse


router = APIRouter(
    prefix="/tracking",
    tags=["Tracking"],
)


@router.post(
    "/",
    response_model=TrackingResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_tracking_location(
    tracking_data: TrackingCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    delivery = (
        db.query(Delivery)
        .filter(Delivery.id == tracking_data.delivery_id)
        .first()
    )

    if not delivery:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Delivery not found.",
        )

    new_tracking = Tracking(
        delivery_id=tracking_data.delivery_id,
        latitude=tracking_data.latitude,
        longitude=tracking_data.longitude,
    )

    db.add(new_tracking)
    db.commit()
    db.refresh(new_tracking)

    return new_tracking


@router.get(
    "/{delivery_id}",
    response_model=list[TrackingResponse],
)
def get_delivery_tracking_history(
    delivery_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    delivery = (
        db.query(Delivery)
        .filter(Delivery.id == delivery_id)
        .first()
    )

    if not delivery:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Delivery not found.",
        )

    return (
        db.query(Tracking)
        .filter(Tracking.delivery_id == delivery_id)
        .order_by(Tracking.recorded_at.asc())
        .all()
    )