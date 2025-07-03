import http from 'http';
import app from './app.js';
import { initializeSocket } from './config/socket.js'

const server = http.createServer(app)
const PORT = process.env.PORT || 3000;

initializeSocket(server)

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});