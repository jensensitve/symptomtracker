import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../App.css"; // Importiere das Styling aus der HealthLog.css-Datei

const HealthLog = () => {
  const [mahlzeit, setMahlzeit] = useState("");
  const [symptom, setSymptom] = useState("");
  const [stuhlgang, setStuhlgang] = useState("");
  const [zeit, setZeit] = useState("");
  const [date, setDate] = useState("");
  const [eintrag, setEintrag] = useState([]);
  const [firstEintragSend, setFirstEintragSend] = useState(false);
  const [selectedEntries, setSelectedEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
     // Nur beim ersten Rendern der Komponente ausführen
     if (!firstEintragSend) {
      fetchEntries();
      setFirstEintragSend(true); // Markieren Sie, dass die Einträge bereits abgerufen wurden
    }
  }, [firstEintragSend]);

  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/data/healthlogs", {
        method: "GET",
        credentials: "include",
        body: JSON.stringify(),
      });

      if (response.ok) {
        const data = await response.json();

        setEintrag(data);
      } else {
        console.error("Error fetching health logs");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      mahlzeit,
      symptom,
      stuhlgang,
      date,
      zeit,
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
        console.log("Health log erfolgreich hinzugefügt!");
        setFirstEintragSend(true);
        setMahlzeit("");
        setSymptom("");
        setStuhlgang("");
        setZeit("");
        setDate("");

        fetchEntries();

      } else {
        const serverAnswer = await response.text();
        console.error(
          serverAnswer,
          "Error beim Hinzufügen von health log Einträgen"
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("api/user/logout", {
        method: "POST",
        credentials: "include",
        // body: JSON.stringify(),
      });

      if (response.ok) {
        console.log("Logout erfolgreich");
        navigate("/login"); // Navigiere zur Login-Seite nach dem Logout
      } else {
      
        console.error("Fehler beim Logout");
      }
    } catch (error) {
      console.error("Fehler beim Logout:", error);
    }
  };

  const handleCheckboxChange = (entryId) => {
    if (selectedEntries.includes(entryId)) {
      setSelectedEntries(selectedEntries.filter(id => id !== entryId));
    } else {
      setSelectedEntries([...selectedEntries, entryId]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const response = await fetch("/api/user/deleteHealthLogs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ selectedEntries }),
      });

      if (response.ok) {
        console.log("Ausgewählte Einträge wurden gelöscht!");
        setSelectedEntries([]);
        fetchEntries(); // Einträge neu laden
      } else {
        const serverAnswer = await response.text();
        console.error("Fehler beim Löschen ausgewählter Einträge:", serverAnswer);
      }
    } catch (error) {
      console.error("Fehler beim Löschen ausgewählter Einträge:", error);
    }
  };




  return (
    <div className="health-log-container">
      <h2>Gesundheitsprotokoll</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            Datum:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label>
            Uhrzeit:
            <input
              type="time"
              value={zeit}
              onChange={(e) => setZeit(e.target.value)}
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
        <br />
      <button className="auth-button" onClick={handleLogout}>
        Logout
      </button>
      </div>
   

      {firstEintragSend && (
      <div className="log-entries">
        <h3>Gespeicherte Einträge:</h3>
        <ul className="entry-list">
          {eintrag.map((entry, index) => (
            <li key={index} className="entry">
              <div className="entry-date">
                Datum: {new Date(entry.date).toLocaleDateString('de-DE')}
              </div>
              <div className="entry-time">Uhrzeit: {entry.zeit}</div>
              <div className="entry-details">
                <div>Mahlzeit: {entry.mahlzeit}</div>
                <div>Symptom: {entry.symptom}</div>
                <div>Stuhlgang: {entry.stuhlgang}</div>
              </div>
              <div className="entry-actions">
                <input
                  type="checkbox"
                  checked={selectedEntries.includes(entry._id)}
                  onChange={() => handleCheckboxChange(entry._id)}
                />
                <button onClick={() => handleDeleteSelected(entry._id)}>Löschen</button>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={handleDeleteSelected}>Ausgewählte löschen</button>
      </div>
    )}
  </div>
);
}

export default HealthLog;
