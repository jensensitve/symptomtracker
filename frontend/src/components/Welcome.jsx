import React, { useState } from "react";

const Welcome = () => {
    const [username, setUsername] = useState("");

    return (
        <div>
            <h1>Willkommen, {username}!</h1>
            <p>Sie sind jetzt angemeldet.</p>
        </div>
    );
};

export default Welcome
