import React from 'react'
import { BiCurrentLocation } from 'react-icons/bi'
import { GoLocation } from 'react-icons/go'
import { RiTaxiFill, RiCashLine } from 'react-icons/ri'

const WaitingForDriver = ({ waitingForDriverRef, setWaitingForDriverPanelOpen, ride }) => {
    return (
        <>
            <h5
                ref={waitingForDriverRef}
                onClick={() => setWaitingForDriverPanelOpen(false)}
                className='absolute top-2 w-full flex items-center justify-center text-gray-400 p-1 text-2xl'>
                <div className='w-50 h-1 bg-gray-300  rounded-full'></div>
            </h5>
            <h2 className='text-2xl text-center font-semibold mb-5'>Waiting for Driver</h2>
            <div className='flex items-center justify-between px-12'>
                <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className='text-right'>
                    <h2 className='text-lg font-medium'>{ride?.captain.fullname.firstname}</h2>
                    <h4 className='text-xl font-semibold -my-1'>{ride?.captain.vehicle.plate}</h4>
                    <p className='text-sm text-gray-600'>{ride?.captain.vehicle.model} </p>
                    <h1 className='text-lg font-semibold'>{ride?.otp}</h1>
                </div>
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
                        <h4 className='text-base font-medium'>₹ {ride?.fare}</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WaitingForDriver