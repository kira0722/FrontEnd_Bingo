import React, { useEffect, useState } from "react";
import socket from "../../socketService.js";
import { useNavigate } from "react-router-dom";
import "./Game.css";

const Game = () => {
  const [tarjeton, setTarjeton] = useState(null);
  const [balotaActual, setBalotaActual] = useState(null);
  const [marcados, setMarcados] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [balotasEmitidas, setBalotasEmitidas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("resultado", ({ ganador, mensaje }) => {
      setMensaje(mensaje); // Mostrar el mensaje del servidor
      setMostrarModal(true);

      // Redirigir al lobby después de un pequeño retraso
      setTimeout(() => {
        setMostrarModal(false);
        navigate("/lobby");
      }, 3000); // Esperar 3 segundos
    });

    return () => {
      socket.off("resultado");
    };
  }, [navigate]);

  useEffect(() => {
    socket.emit("unirseJuego");

    socket.on("tarjeton", (data) => {
      setTarjeton(data);
    });

    socket.on("balotasEmitidas", (data) => {
      setBalotasEmitidas(data);
      setBalotaActual(data[data.length - 1] || null);
    });

    socket.on("balotaNueva", (balota) => {
      console.log("balota recibida: ", balota);
      setBalotasEmitidas((prev) => [...prev, balota]);
      setBalotaActual(balota);
    });

    // Escuchar el resultado del bingo
    socket.on("resultado", ({ ganador, mensaje }) => {
      setMensaje(mensaje);
      setMostrarMensaje(true);
      setTimeout(() => setMostrarMensaje(false), 8000);
    });

    return () => {
      socket.off("tarjeton");
      socket.off("balotasEmitidas");
      socket.off("balotaNueva");
      socket.off("disconnect");
    };
  }, []);

  const marcarCelda = (columna, fila) => {
    const numero = tarjeton[columna][fila];
    const celdaId = `${columna}${fila + 1}`;
    console.log(`Intentando marcar: ${celdaId} (${numero})`);

    if (numero === "FREE" || balotasEmitidas.some((b) => b.numero === numero)) {
      if (!marcados.includes(celdaId)) {
        setMarcados((prev) => [...prev, celdaId]);
        socket.emit("marcarCelda", { columna, fila });
        console.log(`Celda marcada: ${celdaId}`);
      } else {
        alert("Esta celda ya está marcada.");
      }
    } else {
      alert("No puedes marcar esta celda.");
    }
  };

  const declararBingo = () => {
    socket.emit("bingo");
  };

  return (
    <div>
      <div className="sala">
        {mostrarMensaje && (
          <div className="modal">
            <p>{mensaje}</p>
          </div>
        )}
        <h1>Bingo el Gran Buda</h1>
        <div className="tabla">
          {mensaje && <p>{mensaje}</p>}
          {tarjeton && (
            <table border="1">
              <thead>
                <tr>
                  {Object.keys(tarjeton).map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.keys(tarjeton).map((col) => (
                      <td
                        key={`${col}-${rowIndex}`}
                        onClick={() => marcarCelda(col, rowIndex)}
                        style={{
                          backgroundColor: marcados.includes(
                            `${col}${rowIndex + 1}`
                          )
                            ? "#A6AEBF"
                            : "white",
                          cursor: "pointer",
                        }}
                      >
                        {tarjeton[col][rowIndex]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="marcador">
          <h1>Balota Actual</h1>
          {balotaActual && balotaActual.letra && balotaActual.numero ? (
            <p>
              {balotaActual.letra} {balotaActual.numero}
            </p>
          ) : (
            <p>...</p>
          )}
        </div>
        <button onClick={declararBingo}> BINGO </button>
      </div>
    </div>
  );
};

export default Game;
