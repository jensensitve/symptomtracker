import React, { useState } from "react";

const HealthLog = () => {
  const [mahlzeit, setMahlzeit] = useState("");
  const [symptom, setSymptom] = useState("");
  const [stuhlgang, setStuhlgang] = useState("");
  const [uhrzeit, setUhrzeit] = useState(""); // Zustand für die Uhrzeit

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = {
      mahlzeit,
      symptom,
      stuhlgang,
      date: uhrzeit, // Füge die Uhrzeit zum Datenobjekt hinzu
    };

    try {
        const response = await fetch("/api/data/healthlog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        });

        if (response.ok) {
          // Handle successful response here
          console.log("Health log entry added successfully!");
        } else {
          const serverAnswer = await response.text();
          console.error(serverAnswer, "Error adding health log entry");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    return (
      <div>
        <h2>Gesundheitsprotokoll</h2>
        <form onSubmit={handleSubmit}>
          {/* Hier muss noch das Datum rein */}
    
          <label>
            Uhrzeit:
            <input
              type="datetime-local"
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

  
  export default HealthLog