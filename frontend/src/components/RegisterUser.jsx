import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
// import axios from "axios";

function RegisterUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    // customerId: "",
    email: "",
    password: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const changeUserHandler = (key, value) => {
    setUser((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    // Führe hier den API-Aufruf zur Registrierung durch
    try {
    const response = await fetch("/api/user/register",  {
        method: "POST",
        credentials: "same-origin", //include
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        
      });
     console.log (response)

      if (response.status === 201) {
        // Erfolgreich registriert, weiterleiten oder andere Aktionen durchführen
        setRegistrationSuccess(true); // Setze den Zustand auf erfolgreich
        setTimeout(() => {
        navigate("/register"); // Passe die Zielroute an
      }, 3000);
      } else {
        console.error("Registrierung fehlgeschlagen");
      }
    } catch (error) {
      console.error("Fehler bei der Registrierung:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <form>
        <label>name</label>
        <input
          value={user.name}
          onChange={(event) =>
            changeUserHandler("name", event.target.value)
          }
        />
           {/* <label>customerId</label>
          <input
            value={user.customerId}
            onChange={(event) =>
              changeUserHandler("customerId", event.target.value)
            }
          /> */}
        <label>Email</label>
        <input
          value={user.email}
          onChange={(event) => changeUserHandler("email", event.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={user.password}
          onChange={(event) =>
            changeUserHandler("password", event.target.value)
          }
        />
        <button className="auth-button" onClick={(event) => submitHandler(event)}>Register</button>
      </form>
    {/* hier muss noch nachgebessert werden!!! */}
      {registrationSuccess && (
        <p>Registrierung erfolgreich! <br />Gehe jetzt zum Login!</p>
        )}
        <Link to="/login" className="auth-button">
        Login
        </Link>
         
    </div>
  );
}

export default RegisterUser;
