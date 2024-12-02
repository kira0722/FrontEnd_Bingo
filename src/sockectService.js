import { io } from 'socket.io-client';

// Configura la conexión con el servidor WebSocket
const socket = io('http://localhost:5000'); // URL del backend

// Exportar el socket para usarlo en otros componentes
export default socket;