import { Server as SocketIO } from "socket.io"
import User from '../models/user.model.js'
import Captain from '../models/captain.model.js'

let io

export function initializeSocket(server) {
    io = new SocketIO(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {
        socket.on('join', async (data) => {
            const { userId, userType } = data
            if (userType === 'user') {
                await User.findByIdAndUpdate(userId, { socketId: socket.id })
            } else if (userType === 'captain') {
                await Captain.findByIdAndUpdate(userId, { socketId: socket.id })
            }
        })

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' })
            }

            await Captain.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            })
        })

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`)
        })
    })
}

export const sendMessageToSocketId = (socketId, messageObject) => {
    console.log(messageObject)
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data)
    } else {
        console.log('Socket.io not initialized.')
    }
}