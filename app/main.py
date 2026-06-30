from fastapi import FastAPI


app = FastAPI(
    title="Fleet & Delivery Management Platform",
    version="1.0.0",
    description="Backend API for Fleet & Delivery Management"
)


@app.get("/")
def root():
    return {
        "message": "Fleet & Delivery Management Platform API",
        "status": "Running"
    }