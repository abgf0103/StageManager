import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import axios from "axios";
const SeatView = () => {
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
                    `http://localhost:8080/seats/theater/${selectedTheaterId}`
                );
                setSeats(response.data); // 선택된 극장의 좌석 데이터를 상태에 저장
            } catch (error) {
                console.error("Error fetching seats:", error);
            }
        } else {
            setSeats([]); // 극장이 선택되지 않은 경우 좌석 배열 초기화
        }
    };

    console.table(theaters);

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

export default SeatView;
