from datetime import datetime

from pydantic import BaseModel, ConfigDict


class DeliveryBase(BaseModel):
    order_number: str
    customer_name: str
    pickup_address: str
    delivery_address: str
    package_weight: float
    priority: str = "Normal"
    scheduled_time: datetime
    driver_id: int
    vehicle_id: int


class DeliveryCreate(DeliveryBase):
    pass


class DeliveryUpdate(BaseModel):
    customer_name: str | None = None
    pickup_address: str | None = None
    delivery_address: str | None = None
    package_weight: float | None = None
    priority: str | None = None
    scheduled_time: datetime | None = None
    status: str | None = None
    driver_id: int | None = None
    vehicle_id: int | None = None


class DeliveryResponse(DeliveryBase):
    id: int
    status: str

    model_config = ConfigDict(from_attributes=True)