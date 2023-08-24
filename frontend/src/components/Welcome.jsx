import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Welcome = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetch("api/user/getUser", {
            method: "GET",
            credentials: "include", // Send cookies with the request
        })
        .then(response => response.json())
        .then(data => {
            if (data.name) {
                setUsername(data.name);
            }
        })
        .catch(error => console.error("Error fetching user:", error));
    }, []);

    return (
        <div>
            <h1>Willkommen, {username}!</h1>
            <p>Sie sind jetzt angemeldet.</p>
            <Link to="/healthlog">Zum Gesundheitsprotokoll</Link>
        </div>
    );
};

export default Welcome;
