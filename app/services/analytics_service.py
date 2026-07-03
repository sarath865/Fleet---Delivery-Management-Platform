from sqlalchemy.orm import Session

from app.models.driver import Driver
from app.models.vehicle import Vehicle
from app.models.delivery import Delivery


def get_dashboard_analytics(db: Session):
    total_drivers = db.query(Driver).count()
    total_vehicles = db.query(Vehicle).count()
    total_deliveries = db.query(Delivery).count()

    pending_deliveries = (
        db.query(Delivery)
        .filter(Delivery.status == "Pending")
        .count()
    )

    in_transit_deliveries = (
        db.query(Delivery)
        .filter(Delivery.status == "In Transit")
        .count()
    )

    completed_deliveries = (
        db.query(Delivery)
        .filter(Delivery.status == "Completed")
        .count()
    )

    available_drivers = (
        db.query(Driver)
        .filter(Driver.is_available == True)
        .count()
    )

    available_vehicles = (
        db.query(Vehicle)
        .filter(Vehicle.status == "Available")
        .count()
    )

    return {
        "total_drivers": total_drivers,
        "total_vehicles": total_vehicles,
        "total_deliveries": total_deliveries,
        "pending_deliveries": pending_deliveries,
        "in_transit_deliveries": in_transit_deliveries,
        "completed_deliveries": completed_deliveries,
        "available_drivers": available_drivers,
        "available_vehicles": available_vehicles,
    }