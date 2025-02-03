import React from "react";
import CVUpload from "./components/CVUpload";

function App() {
    console.log("🟢 App.jsx wird geladen!");

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <CVUpload />
        </div>
    );
}

export default App;

