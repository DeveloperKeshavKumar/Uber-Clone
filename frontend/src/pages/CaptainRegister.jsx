import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainRegister = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})
    const navigate = useNavigate()

    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState(0)
    const [vehicleType, setVehicleType] = useState('')
    const [vehicleModel, setVehicleModel] = useState('')

    const { setCaptain } = useContext(CaptainDataContext)

    const SERVER_URL = import.meta.env.VITE_ENV === 'development' ? import.meta.env.VITE_SERVER_URL_DEV : import.meta.env.VITE_SERVER_URL

    const handleSubmit = async (e) => {
        e.preventDefault()

        setCaptainData({
            fullName: { firstName, lastName }, email, password, vehicle: {
                color: vehicleColor,
                model: vehicleModel,
                plate: vehiclePlate,
                type: vehicleType,
                capacity: vehicleCapacity
            }
        })

        const response = await axios.post(`${SERVER_URL}/captain/register`, captainData)

        if (response.status === 201) {
            localStorage.setItem('token', response.data.token)
            setCaptain(response.data.captain)
            navigate('/captain/home')
        }

        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setVehicleCapacity()
        setVehicleColor('')
        setVehicleModel('')
        setVehiclePlate('')
        setVehicleType('')
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-18 mb-10 rounded-md' src="data:image/png;base64,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" alt="" />

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

                    <label htmlFor="vehicleplate" className='text-xl font-medium'>Enter Vehicle Details</label>
                    <div className='flex gap-x-2.5 -mb-2'>
                        <input
                            className='bg-[#eee] mt-2 mb-6 rounded px-4 py-2 w-1/1 border text-lg placeholder:text-base'
                            id='vehicleplate'
                            name='vehicleplate'
                            type="text"
                            value={vehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value)}
                            required
                            placeholder='Plate Number' />

                        <input
                            className='bg-[#eee] mt-2 mb-6 rounded px-4 py-2 w-1/1 border text-lg placeholder:text-base'
                            id='vehiclemodel'
                            name='vehiclemodel'
                            type="text"
                            value={vehicleModel}
                            onChange={(e) => setVehicleModel(e.target.value)}
                            required
                            placeholder='Vehicle Model' />
                    </div>

                    <div className='flex gap-2.5'>
                        <input
                            className='bg-[#eee] mt-2 mb-6 rounded px-4 py-2 w-1/3 border text-lg placeholder:text-base'
                            id='vehiclecolor'
                            name='vehiclecolor'
                            type="text"
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                            required
                            placeholder='Color' />

                        <select
                            className='bg-[#eee] mt-2 mb-6 rounded px-4 py-2 w-1/3 border border-gray-800 focus:border-black text-lg'
                            id='vehicletype'
                            name='vehicletype'
                            type="text"
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            required
                            placeholder='Vehicle Type (Car)' >
                            <option value="">Select Type</option>
                            <option value="car" >Car</option>
                            <option value="bike">Bike</option>
                        </select>

                        <input
                            className='bg-[#eee] mt-2 mb-6 rounded px-4 py-2 w-1/3 border text-lg placeholder:text-base'
                            id='vehiclecapacity'
                            name='vehiclecapacity'
                            type="number"
                            value={vehicleCapacity}
                            onChange={(e) => setVehicleCapacity(e.target.value)}
                            required
                            placeholder='Capacity' />
                    </div>
                    <button
                        className='bg-[#111] text-white font-semibold text-xl mt-2 mb-3 rounded px-4 py-2 w-full placeholder:text-base'
                        type="submit">Join us Captain</button>
                </form>
                <p className='text-center text-lg'>Already working with us? <Link to={'/captain/login'} className='text-blue-600'>Login here</Link> </p>
            </div>
            <div>
                <p className='text-sm'>This site is protected by reCAPTCHA and <span className='underline'>Uber Privacy Policy</span> the and <Link to={'/terms'} className='text-blue-600'> Terms of service apply</Link>.</p>
            </div>
        </div>
    )
}

export default CaptainRegister