import React from 'react';
import { Link } from 'react-router-dom'; // Stelle sicher, dass du den Router korrekt konfiguriert hast

function DashboardUser() {
  return (
    <div className="dashboard-container">
<<<<<<< HEAD
      <h1>Welcome to Your Dashboard</h1>
     
=======
      <h1>Symtom Tracker</h1>
>>>>>>> 9b266ffd56ceec5bfd9c2e1bcd46b07326eaf4b7
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
