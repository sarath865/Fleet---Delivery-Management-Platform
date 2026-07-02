from pydantic import BaseModel, ConfigDict


class VehicleBase(BaseModel):
    vehicle_number: str
    vehicle_type: str
    capacity: float
    fuel_type: str
    status: str = "Available"


class VehicleCreate(VehicleBase):
    pass


class VehicleUpdate(BaseModel):
    vehicle_number: str | None = None
    vehicle_type: str | None = None
    capacity: float | None = None
    fuel_type: str | None = None
    status: str | None = None
    is_active: bool | None = None


class VehicleResponse(VehicleBase):
    id: int
    is_active: bool

    model_config = ConfigDict(from_attributes=True)