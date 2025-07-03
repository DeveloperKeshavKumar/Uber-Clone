import axios from 'axios'
import  { useContext } from 'react'
import { useNavigate } from 'react-router'
import { UserDataContext } from '../context/UserContext'

const UserLogout = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext)

    async function logout() {
        const SERVER_URL = import.meta.env.VITE_ENV === 'developement' ? import.meta.env.VITE_SERVER_URL_DEV : import.meta.env.VITE_SERVER_URL
        const response = await axios.get(`${SERVER_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200) {
            localStorage.removeItem('token')
            setUser({})
            navigate('/login')
        }
    }

    return (
        <div>
            <button className='border px-3 py-2 rounded mt-4' onClick={logout}>logout</button>
        </div>
    )
}

export default UserLogout