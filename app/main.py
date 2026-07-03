from fastapi import FastAPI

from app.api.auth import router as auth_router
from app.api.drivers import router as driver_router
from app.api.vehicles import router as vehicle_router
from app.api.deliveries import router as delivery_router
from app.api.tracking import router as tracking_router
from app.api.analytics import router as analytics_router


app = FastAPI(
    title="Fleet & Delivery Management Platform",
    description="Backend API for Fleet & Delivery Management",
    version="1.0.0",
)


# Authentication Routes
app.include_router(auth_router)

# Driver Routes
app.include_router(driver_router)

# Vehicle Routes
app.include_router(vehicle_router)

# Delivery Routes
app.include_router(delivery_router)

# Tracking Routes
app.include_router(tracking_router)

# Analytics Routes
app.include_router(analytics_router)


@app.get("/")
def root():
    return {
        "message": "Fleet & Delivery Management Platform API",
        "status": "Running",
    }