import React, { useState, useEffect } from "react";

function GetAllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    try {
      const response = await fetch("/api/user/getUsers"
      );

      if (response.status === 200) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Fehler beim Abrufen der Benutzer");
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Benutzer:", error);
    }
  };

  return (
    <div className="user-list">
      <h2>Alle Benutzer</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetAllUsers;
