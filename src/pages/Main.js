import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <h1>홈페이지</h1>
            <div>
                <Link to="/theater-registration">
                    <button>극장 등록</button>
                </Link>
                <Link to="/seat-registration">
                    <button>좌석 등록</button>
                </Link>
                <Link to="/view-seats">
                    <button>좌석 조회</button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
