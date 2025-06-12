import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainProtectWrapper = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const { setCaptain } = useContext(CaptainDataContext)

    useEffect(() => {
        if (!token) {
            navigate('/captain/login')
        }
    }, [token])


    useEffect(() => {
        const SERVER_URL = import.meta.env.VITE_ENV === 'developement' ? import.meta.env.VITE_SERVER_URL_DEV : import.meta.env.VITE_SERVER_URL
        axios.get(`${SERVER_URL}/captain/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status == 200) {
                setCaptain(response.data.captain)
                setIsLoading(false)
            }
        }).catch(error => {
            console.log(error)
            localStorage.removeItem('token')
            navigate('/captain/login')
        })

    }, [])


    if (isLoading) {
        return <div className='h-screen flex items-center justify-center animate-pulse'>LOADING...</div>
    }

    return (
        <div>{children}</div>
    )
}

export default CaptainProtectWrapper