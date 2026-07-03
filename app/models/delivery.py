from sqlalchemy import (
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    func,
)

from sqlalchemy.orm import relationship

from app.core.database import Base


class Delivery(Base):
    __tablename__ = "deliveries"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    order_number = Column(
        String(50),
        unique=True,
        nullable=False,
        index=True,
    )

    customer_name = Column(
        String(100),
        nullable=False,
    )

    pickup_address = Column(
        String(255),
        nullable=False,
    )

    delivery_address = Column(
        String(255),
        nullable=False,
    )

    package_weight = Column(
        Float,
        nullable=False,
    )

    priority = Column(
        String(30),
        default="Normal",
        nullable=False,
    )

    scheduled_time = Column(
        DateTime(timezone=True),
        nullable=False,
    )

    status = Column(
        String(30),
        default="Pending",
        nullable=False,
    )

    driver_id = Column(
        Integer,
        ForeignKey("drivers.id"),
        nullable=False,
    )

    vehicle_id = Column(
        Integer,
        ForeignKey("vehicles.id"),
        nullable=False,
    )

    driver = relationship("Driver")

    vehicle = relationship("Vehicle")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )