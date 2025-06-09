import { useState } from 'react'
import { Link } from 'react-router'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})


  const handleSubmit = (e) => {
    e.preventDefault()

    setUserData({ email, password })

    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

        <form onSubmit={(e) => { handleSubmit(e) }}>
          <label htmlFor='email' className='text-xl font-medium'>What's your email ?</label>
          <input
            className='bg-[#eee] mt-2 mb-7 rounded px-4 py-2 w-full border text-lg placeholder:text-base'
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
            className='bg-[#eee] mt-2 mb-7 rounded px-4 py-2 w-full border text-lg placeholder:text-base'
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Name@123' />
          <button
            className='bg-[#111] text-white font-semibold text-xl mt-2 mb-3 rounded px-4 py-2 w-full placeholder:text-base'
            type="submit">Login</button>
        </form>
        <p className='text-center text-lg'>New here? <Link to={'/register'} className='text-blue-600'>Create new Account</Link> </p>
      </div>
      <div>
        <p className='font-medium text-lg'>Are you a Captain?</p>
        <Link to={'/captain/login'}
          className='inline-block text-center bg-amber-500 text-white  font-semibold text-xl mt-2 mb-5 rounded px-4 py-2 w-full placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin