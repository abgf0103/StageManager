import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TheaterRegistration from "./pages/Venue/TheaterRegistration";
import SeatRegistration from "./pages/Venue/SeatRegistration";
import SeatViewer from "./pages/Venue/SeatsView";

function App() {
    return (
        <Router>
            <nav>
                <Link to="/register-theater">극장 등록</Link> |{" "}
                <Link to="/register-seats">좌석 등록</Link> |{" "}
                <Link to="/view-seats">좌석 조회</Link>
            </nav>
            <Routes>
                <Route
                    path="/register-theater"
                    element={<TheaterRegistration />}
                />
                <Route path="/register-seats" element={<SeatRegistration />} />
                <Route path="/view-seats" element={<SeatViewer />} />
            </Routes>
        </Router>
    );
}

export default App;
