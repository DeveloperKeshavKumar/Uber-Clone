import React, { useRef, useState } from 'react'
import { BiExit } from 'react-icons/bi'
import { Link, useLocation } from 'react-router'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {
    const [finishRidePanelOpen, setFinishRidePanelOpen] = useState(false)
    const finishRidePanelRef = useRef(null)

    const location = useLocation()
    const ride = location.state?.ride

    useGSAP(() => {
        if (finishRidePanelOpen) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanelOpen])

    return (
        <div className='h-screen'>

            <div className='fixed top-0 p-3 w-full flex items-center justify-between'>
                <h3 className='font-bold text-2xl p-2'>UBER</h3>
                <Link to={'/captain/home'} className=' flex items-center justify-center p-1 rounded-full bg-white'>
                    <BiExit className='text-2xl font-medium' />
                </Link>
            </div>
            <div className='h-4/5'>
                <img src="/Uber-Get-Started.png" alt=" temporary image" className='w-full h-full' />
            </div>
            <div className='h-1/5 bg-yellow-400 flex flex-col items-center justify-center gap-4 relative'>
                <h5
                    onClick={() => {
                        setFinishRidePanelOpen(true)
                    }}
                    className='absolute top-2 w-full flex items-center justify-center text-white p-1 text-2xl'>
                    <div className='w-50 h-1 bg-gray-200 rounded-full'></div>
                </h5>
                <h4 className='text-xl font-semibold'>4 KM from Destination </h4>
                <button
                    onClick={() => {
                        setFinishRidePanelOpen(true)
                    }}
                    className='bg-green-600 text-white font-semibold text-xl p-3 px-10 -mb-5 rounded-lg'>
                    End Ride
                </button>
            </div>
            <div ref={finishRidePanelRef} className='fixed bottom-0 translate-y-full z-10 bg-white w-full h-screen px-3 py-6 pt-10'>
                <FinishRide ride={ride} setFinishRidePanelOpen={setFinishRidePanelOpen} />
            </div>
            <div className='h-screen fixed w-screen top-0 z-[-1]'>
                <LiveTracking />
            </div>
        </div>
    )
}

export default CaptainRiding