import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Lobby from "./Components/Lobby/Lobby";
import Login from "./Components/Login/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Lobby" element={<Lobby />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
