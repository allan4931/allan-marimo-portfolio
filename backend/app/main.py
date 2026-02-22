from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import contact

app = FastAPI(
    title="Allan Marimo Portfolio API",
    description="Backend for Allan Marimo's professional portfolio",
    version="1.0.0",
)

# CORS — allow frontend origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://allan.zivo.cloud",
        "https://sandbox.allan.zivo.cloud",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router, prefix="/api")


@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "Allan Marimo Portfolio API is running"}
