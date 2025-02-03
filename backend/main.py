from fastapi import FastAPI
from routes import upload, job_matching

app = FastAPI(title="Talent Matching API")

# API-Routen registrieren
app.include_router(upload.router, prefix="/cv")
app.include_router(job_matching.router, prefix="/match")

@app.get("/")
def read_root():
    return {"message": "Talent Matching API läuft!"}

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Falls nötig, ersetze "*" mit "http://localhost:5173"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

