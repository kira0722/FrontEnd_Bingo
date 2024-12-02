import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que se recargue la página

    if (!user || !pass) {
      setMessage("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        USER: user,
        PASS: pass,
      });

      if (response.data.success) {
        const userName = response.data.user;
        console.log("Usuario recibido:", userName);
        // saveUser(userName);
        navigate("/lobby");
      } else {
        setMessage("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error durante la autenticación:", error);
      setMessage("Credenciales incorrectas");
    }
  };

  return (
    <div className="body">
      <div className="login">
        <h1>Inicio de Sesión</h1>
        <div className="login-container">
          <div className="login-box">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Usuario"
                name="USER"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                name="PASS"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <button onClick={handleSubmit} type="submit">
                Iniciar Sesión
              </button>
            </form>
            {message && <p className="error-message">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
