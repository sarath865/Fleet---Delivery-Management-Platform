from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    Integer,
    String,
    func,
)

from app.core.database import Base


class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    vehicle_number = Column(
        String(50),
        unique=True,
        nullable=False,
        index=True,
    )

    vehicle_type = Column(
        String(50),
        nullable=False,
    )

    capacity = Column(
        Float,
        nullable=False,
    )

    fuel_type = Column(
        String(30),
        nullable=False,
    )

    status = Column(
        String(30),
        default="Available",
        nullable=False,
    )

    is_active = Column(
        Boolean,
        default=True,
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )