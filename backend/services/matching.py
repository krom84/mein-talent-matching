import os
from dotenv import load_dotenv
import openai
import re

load_dotenv()
API_KEY = os.getenv("OPENAI_API_KEY")

def analyze_resume(cv_text, job_desc):
    """Vergleicht einen CV mit der Jobbeschreibung und berechnet einen Matching-Score in Prozent."""
    if not API_KEY:
        return {"error": "API Key nicht gefunden!"}

    prompt = f"""
    Vergleiche diesen Lebenslauf mit der Jobbeschreibung und berechne einen Matching-Score von 0-100%. 
    Liste die passenden und fehlenden Skills getrennt auf.

    Format:
    Matching Score: XX%
    Passende Skills: [Skill1, Skill2, Skill3]
    Fehlende Skills: [Skill4, Skill5]

    📌 Lebenslauf:
    {cv_text}

    📌 Jobbeschreibung:
    {job_desc}
    """

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": "Du bist ein HR-Experte für Talent Matching."},
                  {"role": "user", "content": prompt}],
        api_key=API_KEY
    )

    output = response["choices"][0]["message"]["content"]
    print("GPT-4 Antwort:", output)  # Debugging

    # Matching Score mit Regex extrahieren
    score_match = re.search(r"Matching Score: (\d+)%", output)
    matching_score = int(score_match.group(1)) if score_match else 0

    # Skills extrahieren
    matching_skills_match = re.search(r"Passende Skills: \[(.*?)\]", output)
    missing_skills_match = re.search(r"Fehlende Skills: \[(.*?)\]", output)

    matching_skills = matching_skills_match.group(1).split(", ") if matching_skills_match else []
    missing_skills = missing_skills_match.group(1).split(", ") if missing_skills_match else []

    return {
        "matching_score": matching_score,
        "matching_skills": matching_skills,
        "missing_skills": missing_skills
    }

