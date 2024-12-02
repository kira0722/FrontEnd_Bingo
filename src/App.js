import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Lobby from "./Components/Lobby/Lobby";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/Lobby" element={<Lobby />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
