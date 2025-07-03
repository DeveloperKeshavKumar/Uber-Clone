import React from 'react'
import { BiCurrentLocation } from 'react-icons/bi'
import { GoLocation } from 'react-icons/go'
import { RiCashLine, RiTaxiFill } from 'react-icons/ri'

const RidePopUp = ({ setRidePopUpPanelOpen, setConfirmRidePopUpPanelOpen }) => {
    return (
        <>
            <h5
                onClick={() => setRidePopUpPanelOpen(false)}
                className='absolute top-2 w-full flex items-center justify-center text-gray-400 p-1 text-2xl'>
                <div className='w-50 h-1 bg-gray-300  rounded-full'></div>
            </h5>
            <h2 className='text-2xl text-center font-semibold mb-5'>New ride available!</h2>
            <div className='flex justify-between items-center p-4 px-6 bg-yellow-400 rounded-lg'>
                <div className='flex justify-start items-center gap-4'>
                    {/* User Image */}
                    <img className='h-12 w-12 border rounded-full object-cover' src="/Uber-Get-Started.png" alt="" />
                    <h4 className='text-lg font-medium'>Harshita Singh</h4>
                </div>
                <h5 className='font-medium'><span className='text-lg'>22 KM</span> away</h5>
            </div>
            <div className="flex flex-col gap-5 justify-center items-center">
                <div className="w-full">
                    <div
                        className='my-2 p-2 pb-4 border-gray-300 border-b-2 flex items-center justify-start gap-4'>
                        <h2 className='bg-[#eee] p-2 rounded-full text-xl'><BiCurrentLocation /></h2>
                        <h4 className='text-base font-medium'>332, Near Kali Devi Temple, Tibba Colony, Ratia - 125051332, Near Kali Devi Temple, Tibba Colony, Ratia - 125051</h4>
                    </div>
                    <div
                        className='my-2 p-2 pb-4 border-gray-300 border-b-2 flex items-center justify-start gap-4'>
                        <h2 className='bg-[#eee] p-2 rounded-full text-xl'><GoLocation /></h2>
                        <h4 className='text-base font-medium'>332, Near Kali Devi Temple, Tibba Colony, Ratia - 125051332, Near Kali Devi Temple, Tibba Colony, Ratia - 125051</h4>
                    </div>
                    <div className='my-2 p-2 pb-4 flex items-center justify-start gap-4'>
                        <h2 className='bg-[#eee] p-2 rounded-full text-xl'><RiCashLine /></h2>
                        <h4 className='text-base font-medium'>₹ 119.20</h4>
                    </div>
                </div>
            </div>
            <div className='flex justify-evenly items-center'>
                <button
                    onClick={() => setRidePopUpPanelOpen(false)}
                    className="w-1/3 bg-gray-300 text-gray-700 font-semibold text-xl p-2 mb-3 rounded-lg">
                    Ignore
                </button>

                <button
                    onClick={() => {
                        setRidePopUpPanelOpen(false)
                        setConfirmRidePopUpPanelOpen(true)
                    }}
                    className="w-1/3 bg-green-600 text-white font-semibold text-xl p-2 mb-3 rounded-lg">
                    Accept
                </button>
            </div>

        </>
    )
}

export default RidePopUp