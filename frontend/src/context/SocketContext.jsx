
import React, { createContext, useEffect } from 'react'
import { io } from 'socket.io-client'

export const SocketContext = createContext()
const SOCKET_URL = import.meta.env.VITE_ENV === 'development' ? import.meta.env.VITE_SOCKET_URL_DEV : import.meta.env.VITE_SOCKET_URL
const socket = io(`${SOCKET_URL}`)

const SocketProvider = ({ children }) => {
    useEffect(() => {
        console.log("Tryinfg to connect to socket servers");

        socket.on('connect', () => {
            console.log('Connected to Socket server')
        })

        socket.on('disconnect', () => {
            console.log('Disconnected from server')
        })

    }, [])

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider