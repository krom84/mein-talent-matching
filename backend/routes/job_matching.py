from fastapi import APIRouter, UploadFile, File, Form
from services.matching import analyze_resume
from routes.upload import extract_text_from_pdf

router = APIRouter()

@router.post("/match/")
async def match_cv(file: UploadFile = File(...), job_description: str = Form(...)):
    """Vergleicht einen CV mit einer Jobbeschreibung und gibt einen Matching-Score zurück."""
    if file.filename.endswith(".pdf"):
        cv_text = extract_text_from_pdf(file)
        matching_result = analyze_resume(cv_text, job_description)
        return {"matching_result": matching_result}
    else:
        return {"error": "Nur PDF-Dateien werden unterstützt!"}

