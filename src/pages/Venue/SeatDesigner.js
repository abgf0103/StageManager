import React, { useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";

const SeatDesigner = () => {
    // 기본 좌석 배열 (10x2)
    const initialSeats = Array.from({ length: 10 }, (_, rowIndex) =>
        Array.from({ length: 2 }, (_, colIndex) => ({
            id: `${rowIndex}-${colIndex}`,
            x: colIndex * 100 + 20,
            y: rowIndex * 100 + 20,
            seatNumber: rowIndex * 2 + colIndex + 1, // 좌석 번호
        }))
    ).flat();

    const [seats, setSeats] = useState(initialSeats);

    // 좌석을 마우스로 이동할 수 있도록 처리하는 함수
    const handleDragMove = (e, seatId) => {
        const newSeats = seats.map((seat) =>
            seat.id === seatId
                ? { ...seat, x: e.target.x(), y: e.target.y() }
                : seat
        );
        setSeats(newSeats);
    };

    // 좌석 추가 함수
    const addSeat = () => {
        const newSeat = {
            id: `${seats.length}-${seats.length % 2}`,
            x: 100 * (seats.length % 2) + 20,
            y: Math.floor(seats.length / 2) * 100 + 20,
            seatNumber: seats.length + 1,
        };
        const newSeats = [...seats, newSeat];
        setSeats(newSeats);
    };

    // 좌석 정보 출력 함수
    const printSeats = () => {
        console.log(seats);
    };

    return (
        <div>
            <button onClick={addSeat}>좌석 추가</button>
            <button onClick={printSeats}>좌석 정보 출력</button>
            <Stage width={800} height={600}>
                <Layer>
                    {seats.map((seat) => (
                        <React.Fragment key={seat.id}>
                            <Rect
                                x={seat.x}
                                y={seat.y}
                                width={80}
                                height={80} // 정사각형
                                fill="lightblue"
                                draggable
                                onDragMove={(e) => handleDragMove(e, seat.id)}
                            />
                            <Text
                                x={seat.x + 20}
                                y={seat.y + 25} // 텍스트 위치 조정
                                text={`${seat.seatNumber}`}
                                fontSize={18}
                                fill="black"
                            />
                        </React.Fragment>
                    ))}
                </Layer>
            </Stage>
        </div>
    );
};

export default SeatDesigner;
