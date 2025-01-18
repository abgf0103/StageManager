import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SeatDesigner from "./pages/Venue/SeatDesigner";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SeatDesigner />} />
            </Routes>
        </Router>
    );
}

export default App;
