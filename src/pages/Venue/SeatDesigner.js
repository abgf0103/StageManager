import React, { useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import axios from "axios";

const SeatLayout = () => {
    const [seats, setSeats] = useState(
        Array.from({ length: 2 }, (_, rowIndex) =>
            Array.from({ length: 5 }, (_, colIndex) => ({
                id: rowIndex * 5 + colIndex + 1,
                seatNumber: `${rowIndex * 5 + colIndex + 1}`,
                x: colIndex * 50,
                y: rowIndex * 50,
            }))
        ).flat()
    ); // Default 5x2 seat layout

    const [theaterId, setTheaterId] = useState(1); // Default theater ID

    // Add a new seat to the layout
    const addSeat = () => {
        const newSeat = {
            id: seats.length + 1, // Generate a simple unique ID
            seatNumber: `${seats.length + 1}`,
            x: 10, // Default position
            y: 750, // Default position
        };
        setSeats([...seats, newSeat]);
    };

    // Update seat position on drag
    const handleDragMove = (e, id) => {
        const newSeats = seats.map((seat) => {
            if (seat.id === id) {
                return {
                    ...seat,
                    x: e.target.x(),
                    y: e.target.y(),
                };
            }
            return seat;
        });
        setSeats(newSeats);
    };

    // Save the seat layout to the server
    const saveLayout = async () => {
        try {
            const response = await axios.post("/save", {
                theaterId,
                seats: seats.map(({ id, x, y, seatNumber }) => ({
                    seatNumber,
                    x,
                    y,
                })),
            });
            alert("Seats saved successfully!");
        } catch (error) {
            console.error("Error saving seats:", error);
            alert("Failed to save seats.");
        }
    };

    const consoleSeats = () => {
        console.table(seats);
    };

    return (
        <div>
            <h1>Seat Layout for Theater {theaterId}</h1>
            <button onClick={addSeat}>좌석 생성</button>
            <button onClick={consoleSeats}>좌석 출력</button>
            <button onClick={saveLayout}>좌석 저장</button>

            <div
                style={{
                    border: "1px solid black",
                    marginTop: "20px",
                    width: "1800px",
                    height: "800px",
                }}
            >
                <Stage width={1800} height={800}>
                    <Layer>
                        {seats.map((seat) => (
                            <React.Fragment key={seat.id}>
                                <Rect
                                    x={seat.x}
                                    y={seat.y}
                                    width={40}
                                    height={40}
                                    fill="lightblue"
                                    draggable
                                    onDragMove={(e) =>
                                        handleDragMove(e, seat.id)
                                    }
                                />
                                <Text
                                    x={seat.x}
                                    y={seat.y}
                                    text={seat.seatNumber}
                                    fontSize={12}
                                    align="center"
                                    fill="black"
                                    offsetY={-5}
                                    width={40}
                                />
                            </React.Fragment>
                        ))}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};

export default SeatLayout;
