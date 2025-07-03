import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { UserDataContext } from '../context/UserContext'

const UserProtectWrapper = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const { setUser } = useContext(UserDataContext)

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        const SERVER_URL = import.meta.env.VITE_ENV === 'developement' ? import.meta.env.VITE_SERVER_URL_DEV : import.meta.env.VITE_SERVER_URL
        axios.get(`${SERVER_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status == 200) {
                setUser(response.data.captain)
                setIsLoading(false)
            }
        }).catch(error => {
            console.log(error)
            localStorage.removeItem('token')
            navigate('/login')
        })
    }, [])


    if (isLoading) {
        return <div className='h-screen flex items-center justify-center animate-pulse'>LOADING...</div>
    }

    return (
        <div>{children}</div>
    )
}

export default UserProtectWrapper