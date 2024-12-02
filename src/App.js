import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Lobby from "./Components/Lobby/Lobby";
import Login from "./Components/Login/Login";
import Game from "./Components/Game/Game";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Lobby" element={<Lobby />} />
          <Route path="/Game" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
