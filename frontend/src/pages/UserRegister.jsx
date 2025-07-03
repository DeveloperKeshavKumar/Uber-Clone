import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserRegister = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()

  const { user, setUser } = useContext(UserDataContext)

  const SERVER_URL = import.meta.env.VITE_ENV === 'development' ? import.meta.env.VITE_SERVER_URL_DEV : import.meta.env.VITE_SERVER_URL

  const handleSubmit = async (e) => {
    e.preventDefault()

    setUserData({ fullName: { firstName, lastName }, email, password })

    const response = await axios.post(`${SERVER_URL}/users/register`, userData)

    if (response.status === 201) {
      localStorage.setItem('token', response.data.token)
      setUser(response.data.user)
      navigate('/home')
    }

    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

        <form onSubmit={(e) => { handleSubmit(e) }}>
          <label htmlFor="firstname" className='text-xl font-medium'>Enter your name</label>
          <div className='flex gap-2.5'>
            <input
              className='bg-[#eee] mt-2 mb-6 rounded px-4 py-2 w-1/2 border text-lg placeholder:text-base'
              id='firstname'
              name='firstname'
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoFocus
              required
              placeholder='First name' />

            <input
              className='bg-[#eee] mt-2 mb-6 rounded px-4 py-2 w-1/2 border text-lg placeholder:text-base'
              id='lastname'
              name='lastname'
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Last name' />
          </div>

          <label htmlFor='email' className='text-xl font-medium'>Enter your email</label>
          <input
            className='bg-[#eee] mt-2 mb-6 rounded px-4 py-2 w-full border text-lg placeholder:text-base'
            id='email'
            name='email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='email'
            autoFocus
            required
            placeholder='name@domain.com' />

          <label htmlFor="password" className='text-xl font-medium'> Enter Password </label>
          <input
            className='bg-[#eee] mt-2 mb-6 rounded px-4 py-2 w-full border text-lg placeholder:text-base'
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Name@123' />
          <button
            className='bg-[#111] text-white font-semibold text-xl mt-2 mb-3 rounded px-4 py-2 w-full placeholder:text-base'
            type="submit">Register</button>
        </form>
        <p className='text-center text-lg'>Already have an account? <Link to={'/login'} className='text-blue-600'>Login here</Link> </p>
      </div>
      <div>
        <p className='text-sm'>By proceeding, you agree to our <Link to={"/terms"} className='text-blue-600'>Terms & Conditions</Link>.</p>

      </div>
    </div>
  )
}

export default UserRegister