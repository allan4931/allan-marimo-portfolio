from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from app.routers import contact

app = FastAPI(
    title="Allan Marimo Portfolio API",
    description="Backend for Allan Marimo's professional portfolio",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://allanmarimo.co.zw",
        "https://www.allanmarimo.co.zw",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router, prefix="/api")

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "Allan Marimo Portfolio API is running"}

frontend_build_path = Path(__file__).parent.parent / "frontend" / "dist"

if frontend_build_path.exists():
    app.mount("/", StaticFiles(directory=str(frontend_build_path), html=True), name="static")
else:
    print(f"Frontend build not found at {frontend_build_path}. Only API routes are available.")