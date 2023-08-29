import React from 'react';
import { Link } from 'react-router-dom'; // Stelle sicher, dass du den Router korrekt konfiguriert hast

function DashboardUser() {
  return (
    <div className="style-container">
      <h1>Willkommen zu deinem persönlichen Symptomtracker</h1>

      <div className="button-container">
        <Link to="/login" className="auth-button">
          Login
        </Link>
        <Link to="/register" className="auth-button">
          Register
        </Link>
      </div>
    </div>
  );
}

export default DashboardUser;
