import React, { useState } from 'react'
import { BiCurrentLocation } from 'react-icons/bi'
import { GoLocation } from 'react-icons/go'
import { RiCashLine } from 'react-icons/ri'
import { useNavigate } from 'react-router'
import axios from 'axios'

const ConfirmRidePopUp = ({ setRidePopUpPanelOpen, setConfirmRidePopUpPanelOpen, ride }) => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.prevenDefault()
        const SERVER_URL = import.meta.env.VITE_ENV === 'development' ? import.meta.env.VITE_SERVER_URL_DEV : import.meta.env.VITE_SERVER_URL
        const response = await axios.get(`${SERVER_URL}/rides/start-ride`, {
            params: {
                rideId: ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            navigate('/captain-riding', { state: { ride } })
        }
    }

    return (
        <div >
            <h5
                onClick={() => {
                    setConfirmRidePopUpPanelOpen(false)
                    setRidePopUpPanelOpen(true)
                }}
                className='absolute top-2 w-full flex items-center justify-center text-gray-400 p-1 text-2xl'>
                <div className='w-50 h-1 bg-gray-300  rounded-full'></div>
            </h5>
            <h2 className='text-2xl text-center font-semibold mb-5'>Confirm Ride</h2>
            <div className='flex justify-between items-center p-4 px-6 bg-yellow-400 rounded-lg'>
                <div className='flex justify-start items-center gap-4'>
                    {/* User Image */}
                    <img className='h-12 w-12 border rounded-full object-cover' src="/Uber-Get-Started.png" alt="" />
                    <h4 className='text-lg font-medium'>{ride?.user.fullname.firstname}</h4>
                </div>
                <h5 className='font-medium'><span className='text-lg'>2.2 KM</span> away</h5>
            </div>
            <div className="flex flex-col gap-5 justify-center items-center">
                <div className="w-full">
                    <div
                        className='my-2 p-2 pb-4 border-gray-300 border-b-2 flex items-center justify-start gap-4'>
                        <h2 className='bg-[#eee] p-2 rounded-full text-xl'><BiCurrentLocation /></h2>
                        <p className='text-sm -mt-1 text-gray-600'>{ride?.pickup}</p>
                    </div>
                    <div
                        className='my-2 p-2 pb-4 border-gray-300 border-b-2 flex items-center justify-start gap-4'>
                        <h2 className='bg-[#eee] p-2 rounded-full text-xl'><GoLocation /></h2>
                        <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                    </div>
                    <div className='my-2 p-2 pb-4 flex items-center justify-start gap-4'>
                        <h2 className='bg-[#eee] p-2 rounded-full text-xl'><RiCashLine /></h2>
                        <h3 className='text-lg font-medium'>₹ {ride?.fare} </h3>
                    </div>
                </div>
            </div>

            <form
                onSubmit={(e) => submitHandler(e)}
                className='flex flex-col justify-center items-center'    >
                <label htmlFor="otp" className='text-xl font-medium'></label>
                <input
                    className='bg-[#eee] mt-2 mb-6 rounded px-4 py-2 w-[80%] font-mono text-xl placeholder:text-base'
                    type="text"
                    name="otp"
                    id="otp"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder='Enter OTP' />
                <div className='flex justify-evenly items-center w-full'>
                    <button
                        type='reset'
                        onClick={() => {
                            setRidePopUpPanelOpen(false)
                            setConfirmRidePopUpPanelOpen(false)
                        }}
                        className="w-1/3 bg-red-600 text-white font-semibold text-xl p-2 mb-3 rounded-lg">
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className="w-1/3 bg-green-600 text-white font-semibold text-xl p-2 mb-3 rounded-lg">
                        Confirm
                    </button>
                </div>
            </form>

        </div>
    )
}

export default ConfirmRidePopUp