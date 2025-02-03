import { useState, useEffect } from "react";
import axios from "axios";
document.title = "KI Talent Matching – Dein perfekter Job!";
const CVUpload = () => {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [matchingScore, setMatchingScore] = useState(null);
    const [matchingSkills, setMatchingSkills] = useState([]);
    const [missingSkills, setMissingSkills] = useState([]);

    // Debugging: Zeigt in der Konsole, wenn sich der State ändert
    useEffect(() => {
        console.log("🔄 React State aktualisiert! Neuer Score:", matchingScore);
    }, [matchingScore]);

const uploadFile = async () => {
    if (!file) {
        alert("❌ Bitte eine Datei hochladen!");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDescription);

    try {
        const res = await axios.post("http://127.0.0.1:8000/match/match/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("✅ Backend Antwort:", res.data); // Debugging

        // Sichere Aktualisierung des Matching-Scores
        setMatchingScore(() => {
            console.log("📊 Neuer Score wird gespeichert:", res.data.matching_result.matching_score);
            return res.data.matching_result.matching_score;
        });

        setMatchingSkills(res.data.matching_result.matching_skills || []);
        setMissingSkills(res.data.matching_result.missing_skills || []);

    } catch (error) {
        console.error("❌ Fehler beim Hochladen:", error);
        alert("❌ Hochladen fehlgeschlagen. Prüfe die Konsole für Details.");
    }
};

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">KI-gestütztes Talent Matching</h2>

            <input 
                type="file" 
                id="cv-upload"
                name="cv-upload"
                onChange={(e) => setFile(e.target.files[0])} 
                className="mb-4 w-full border p-2 rounded" 
            />

            <textarea
                id="job-description"
                name="job-description"
                placeholder="Jobbeschreibung eingeben..."
                className="w-full p-2 border rounded mb-4"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
            />

            <button onClick={uploadFile} className="bg-blue-500 text-white px-4 py-2 rounded">Hochladen & Matchen</button>

            {/* Sicherstellen, dass React die Daten rendert */}
            {matchingScore !== null && matchingScore !== undefined && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Ergebnis:</h3>
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold">🔍 Matching Score: {matchingScore}%</h4>
                        <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
                            <div 
                                className={`h-4 rounded-full ${matchingScore >= 70 ? "bg-green-500" : matchingScore >= 40 ? "bg-yellow-500" : "bg-red-500"}`}
                                style={{ width: `${matchingScore}%` }}>
                            </div>
                        </div>
                    </div>

                    {/* Skills in zwei Spalten anzeigen */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-green-600 font-bold mb-2">✅ Passende Skills:</h4>
                            <ul className="list-disc list-inside">
                                {matchingSkills.length > 0 ? matchingSkills.map((skill, index) => (
                                    <li key={index} className="text-green-700 font-medium">{skill}</li>
                                )) : <p className="text-gray-500">Keine passenden Skills gefunden.</p>}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-red-600 font-bold mb-2">❌ Fehlende Skills:</h4>
                            <ul className="list-disc list-inside">
                                {missingSkills.length > 0 ? missingSkills.map((skill, index) => (
                                    <li key={index} className="text-red-700 font-medium">{skill}</li>
                                )) : <p className="text-gray-500">Alle erforderlichen Skills sind vorhanden.</p>}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CVUpload;

