import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./Lobby.css";

Modal.setAppElement("#root");

function Lobby() {
  const [isLobbyOpen, setIsLobbyOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isLobbyOpen && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsLobbyOpen(false);
      alert("Comenzando el juego");
      navigate("/Lobby");
    }
    return () => clearInterval(timer);
  }, [isLobbyOpen, timeLeft, navigate]);

  return (
    <div>
      <div className="home">
        <div className="descripcion">
          <h1>¡Bienvenido!</h1>
          <h1>Este es el Bingo el Gran Buda</h1>
          <h2>Presiona el botón para iniciar partida</h2>
        </div>
        <div className="boton-inicio">
          <button>
            <span onClick={() => setIsLobbyOpen(true)}> Iniciar </span>
          </button>
        </div>
        <Modal
          isOpen={isLobbyOpen}
          onRequestClose={() => setIsLobbyOpen(false)}
          contentLabel="Lobby"
          style={{
            content: {
              top: "430px",
              left: "850px",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              padding: "40px",
              textAlign: "center",
              backgroundColor: "#fff",
            },
          }}>
          <h2>Esperando jugadores...</h2>
          <p>Tiempo restante: {timeLeft} segundos</p>
          <button className="learn-more" onClick={() => setIsLobbyOpen(false)}>
            Cancelar
          </button>
        </Modal>
      </div>
    </div>
  );
}

export default Lobby;
