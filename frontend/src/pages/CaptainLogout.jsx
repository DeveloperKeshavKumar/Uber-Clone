import axios from 'axios'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogout = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)

    async function logout() {
        const SERVER_URL = import.meta.env.VITE_ENV === 'development' ? import.meta.env.VITE_SERVER_URL_DEV : import.meta.env.VITE_SERVER_URL
        const response = await axios.get(`${SERVER_URL}/captain/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200) {
            localStorage.removeItem('token')
            setCaptain({})
            navigate('/captain/login')
        }
    }

    return (
        <div>
            <button className='border px-3 py-2 rounded mt-4' onClick={logout}>logout Captain</button>
        </div>
    )
}

export default CaptainLogout