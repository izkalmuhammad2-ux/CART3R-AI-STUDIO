
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="CART3R AI STUDIO",
    description="CART3R AI Backend API",
    version="2.0.0"
)

# Frontend access configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://izkalmuhammad2-ux.github.io"
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)

@app.get("/")
async def home():
    return {
        "project": "CART3R AI STUDIO",
        "version": "2.0.0",
        "status": "online",
        "message": "CART3R AI Backend Ready"
    }

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": "CART3R AI CORE",
        "version": "2.0.0"
    }

@app.get("/api/status")
async def api_status():
    return {
        "backend": "running",
        "chat_ai": "not_configured",
        "image_ai": "not_configured",
        "photo_lab": "frontend_local"
    }
  
