import React, { useState } from "react";
import axios from "axios";

const TheaterRegistration = () => {
    const [theaterName, setTheaterName] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/api/theaters",
                {
                    name: theaterName,
                    location: location,
                }
            );
            alert("Theater created successfully!");
        } catch (error) {
            console.error("Error creating theater:", error);
            alert("Failed to create theater.");
        }
    };

    return (
        <div>
            <h2>극장 등록</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>극장 이름:</label>
                    <input
                        type="text"
                        value={theaterName}
                        onChange={(e) => setTheaterName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>위치:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <button type="submit">등록</button>
            </form>
        </div>
    );
};

export default TheaterRegistration;
