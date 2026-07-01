from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Integer,
    String,
    func,
)

from app.core.database import Base


class Driver(Base):
    __tablename__ = "drivers"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    full_name = Column(
        String(100),
        nullable=False,
    )

    license_number = Column(
        String(50),
        unique=True,
        nullable=False,
        index=True,
    )

    phone_number = Column(
        String(20),
        unique=True,
        nullable=False,
    )

    # Vehicle module will be added later
    vehicle_id = Column(
        Integer,
        nullable=True,
    )

    is_available = Column(
        Boolean,
        default=True,
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