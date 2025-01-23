import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import axios from "axios";

const SeatRegistration = () => {
    const [theaters, setTheaters] = useState([]); // 극장 목록
    const [seats, setSeats] = useState([]); // 좌석 배열
    const [theaterId, setTheaterId] = useState(""); // 선택된 극장 ID

    // 극장 목록 가져오기
    useEffect(() => {
        const fetchTheaters = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/theaters"
                );
                setTheaters(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching theaters:", error);
            }
        };

        fetchTheaters();
    }, []);

    // 극장을 선택했을 때 좌석 목록 가져오기
    const handleTheaterChange = async (e) => {
        const selectedTheaterId = e.target.value;
        setTheaterId(selectedTheaterId);

        if (selectedTheaterId) {
            // 극장 ID에 맞는 좌석을 가져오는 API 호출 (예시)
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/seats/theater/${selectedTheaterId}`
                );
                setSeats(response.data); // 선택된 극장의 좌석 데이터를 상태에 저장
            } catch (error) {
                console.error("Error fetching seats:", error);
            }
        } else {
            setSeats([]); // 극장이 선택되지 않은 경우 좌석 배열 초기화
        }
    };

    // 좌석 추가
    const addSeat = () => {
        const newSeat = {
            id: seats.length + 1,
            seatNumber: `${seats.length + 1}`,
            x: 10,
            y: 750,
        };
        setSeats([...seats, newSeat]);
    };

    // 좌석 드래그 처리
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

    // 좌석 레이아웃 저장
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

            {/* 극장 선택 */}
            <div>
                <label htmlFor="theater-select">Choose a theater:</label>
                <select
                    id="theater-select"
                    value={theaterId}
                    onChange={handleTheaterChange}
                >
                    <option value="">Select a Theater</option>
                    {theaters.map((theater) => (
                        <option
                            key={theater.theaterId}
                            value={theater.theaterId}
                        >
                            {theater.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* 좌석 관리 버튼들 */}
            <button onClick={addSeat}>좌석 생성</button>
            <button onClick={consoleSeats}>좌석 확인</button>
            <button onClick={saveLayout}>좌석 저장</button>

            {/* 좌석 레이아웃 */}
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

export default SeatRegistration;
