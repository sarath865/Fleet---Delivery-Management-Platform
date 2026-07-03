from datetime import datetime

from pydantic import BaseModel, ConfigDict


class TrackingCreate(BaseModel):
    delivery_id: int
    latitude: float
    longitude: float


class TrackingResponse(BaseModel):
    id: int
    delivery_id: int
    latitude: float
    longitude: float
    recorded_at: datetime

    model_config = ConfigDict(from_attributes=True)