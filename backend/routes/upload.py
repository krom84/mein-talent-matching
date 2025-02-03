from fastapi import APIRouter, UploadFile, File
import fitz  # PyMuPDF für PDF-Verarbeitung

router = APIRouter()

def extract_text_from_pdf(file):
    """Extrahiert Text aus einem hochgeladenen PDF."""
    doc = fitz.open(stream=file.file.read(), filetype="pdf")
    text = "\n".join([page.get_text("text") for page in doc])
    return text

@router.post("/upload/")
async def upload_cv(file: UploadFile = File(...)):
    """API-Endpoint für CV-Upload & Textextraktion"""
    if file.filename.endswith(".pdf"):
        text = extract_text_from_pdf(file)
        return {"cv_text": text}
    else:
        return {"error": "Nur PDF-Dateien werden unterstützt!"}

