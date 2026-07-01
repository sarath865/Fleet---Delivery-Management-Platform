from pydantic import BaseModel, ConfigDict


class DriverBase(BaseModel):
    full_name: str
    license_number: str
    phone_number: str
    vehicle_id: int | None = None
    is_available: bool = True


class DriverCreate(DriverBase):
    pass


class DriverUpdate(BaseModel):
    full_name: str | None = None
    license_number: str | None = None
    phone_number: str | None = None
    vehicle_id: int | None = None
    is_available: bool | None = None
    is_active: bool | None = None


class DriverResponse(DriverBase):
    id: int
    is_active: bool

    model_config = ConfigDict(from_attributes=True)