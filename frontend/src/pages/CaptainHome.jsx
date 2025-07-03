import React, { useRef, useState } from 'react'
import { BiExit } from 'react-icons/bi'
import { Link } from 'react-router'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRideCaptain from '../components/ConfirmRideCaptain'

const CaptainHome = () => {
    const [ridePopUpPanelOpen, setRidePopUpPanelOpen] = useState(true)
    const ridePopUpPanelRef = useRef(null)
    const [confirmRidePopUpPanelOpen, setConfirmRidePopUpPanelOpen] = useState(false)
    const confirmRidePopUpPanelRef = useRef(null)


    useGSAP(() => {
        if (ridePopUpPanelOpen) {
            gsap.to(ridePopUpPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopUpPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ridePopUpPanelOpen])

    useGSAP(() => {
        if (confirmRidePopUpPanelOpen) {
            gsap.to(confirmRidePopUpPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopUpPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePopUpPanelOpen])

    return (
        <div className='h-screen'>
            <div className='fixed top-0 p-3 w-full flex items-center justify-between'>
                <h3 className='font-bold text-2xl p-2'>UBER</h3>
                <Link to={'/captain/logout'} className=' flex items-center justify-center p-1 rounded-full bg-white'>
                    <BiExit className='text-2xl font-medium' />
                </Link>
            </div>
            <div className='h-3/5'>
                <img src="/Uber-Get-Started.png" alt=" temporary image" className='w-full h-full' />
            </div>
            <div className='h-2/5 '>
                <CaptainDetails />
                <div ref={ridePopUpPanelRef} className='fixed bottom-0 translate-y-full z-10 bg-white w-full px-3 py-6 pt-10'>
                    <RidePopUp setRidePopUpPanelOpen={setRidePopUpPanelOpen} setConfirmRidePopUpPanelOpen={setConfirmRidePopUpPanelOpen}/>
                </div>

                <div ref={confirmRidePopUpPanelRef} className='fixed bottom-0 translate-y-full z-10 bg-white w-full h-screen px-3 py-6 pt-10'>
                    <ConfirmRideCaptain setConfirmRidePopUpPanelOpen={setConfirmRidePopUpPanelOpen} setRidePopUpPanelOpen={setRidePopUpPanelOpen} />
                </div>

            </div>
        </div>
    )
}

export default CaptainHome