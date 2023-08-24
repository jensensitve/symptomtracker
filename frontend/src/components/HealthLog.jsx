import React, { useState } from "react";

const HealthLog = () => {
  const [mahlzeit, setMahlzeit] = useState("");
  const [symptom, setSymptom] = useState("");
  const [stuhlgang, setStuhlgang] = useState("");
  const [uhrzeit, setUhrzeit] = useState(""); // Zustand für die Uhrzeit

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const data = {
      mahlzeit,
      symptom,
      stuhlgang,
      uhrzeit, // Füge die Uhrzeit zum Datenobjekt hinzu
    };

    // Hier könntest du fetch oder axios verwenden, um die Daten an den Server zu senden
    // Beispiel: sendeFormData(data);
  };

  return (
    <div>
      <h2>Gesundheitsprotokoll</h2>
      <form onSubmit={handleSubmit}>
      <label>
          Uhrzeit:
          <input
            type="time"
            value={uhrzeit}
            onChange={(e) => setUhrzeit(e.target.value)}
          />
        </label>
        <label>
          Mahlzeit:
          <input
            type="text"
            value={mahlzeit}
            onChange={(e) => setMahlzeit(e.target.value)}
          />
        </label>
        <label>
          Symptom:
          <input
            type="text"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
          />
        </label>
        <label>
          Stuhlgang:
          <input
            type="text"
            value={stuhlgang}
            onChange={(e) => setStuhlgang(e.target.value)}
          />
        </label>
       
        <button type="submit">Senden</button>
      </form>
    </div>
  );
};

export default HealthLog;
