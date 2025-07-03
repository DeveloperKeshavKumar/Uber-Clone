import React, { useContext, useRef, useState, useEffect } from 'react'
import { BiExit } from 'react-icons/bi'
import { Link } from 'react-router'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRideCaptain from '../components/ConfirmRideCaptain'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import LiveTracking from '../components/LiveTracking'

const CaptainHome = () => {
    const [ridePopUpPanelOpen, setRidePopUpPanelOpen] = useState(false)
    const ridePopUpPanelRef = useRef(null)
    const [confirmRidePopUpPanelOpen, setConfirmRidePopUpPanelOpen] = useState(false)
    const confirmRidePopUpPanelRef = useRef(null)
    const [ride, setRide] = useState(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

    useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        setInterval(updateLocation, 10000)
        updateLocation()
    }, [])

    socket.on('new-ride', (data) => {
        setRide(data)
        setRidePopUpPanelOpen(true)
    })

    async function confirmRide() {
        const SERVER_URL = import.meta.env.VITE_ENV === 'development' ? import.meta.env.VITE_SERVER_URL_DEV : import.meta.env.VITE_SERVER_URL
        await axios.post(`${SERVER_URL}/rides/confirm`, {
            rideId: ride._id,
            captainId: captain._id,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setRidePopUpPanelOpen(false)
        setConfirmRidePopUpPanelOpen(true)
    }

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
            <div className='fixed bottom-0 p-3 mt-10 w-full flex items-center justify-between'>
                <h3 className='font-bold text-2xl p-2'>UBER</h3>
                <Link to={'/captain/logout'} className=' flex items-center justify-center p-1 rounded-full bg-white'>
                    <BiExit className='text-2xl font-medium' />
                </Link>
            </div>
            <div className='h-3/5 -z-10'>
                <LiveTracking />
            </div>
            <div className='h-2/5 '>
                <CaptainDetails />
                <div ref={ridePopUpPanelRef} className='fixed bottom-0 translate-y-full z-10 bg-white w-full px-3 py-6 pt-10'>
                    <RidePopUp ride={ride} confirmRide={confirmRide} setRidePopUpPanelOpen={setRidePopUpPanelOpen} setConfirmRidePopUpPanelOpen={setConfirmRidePopUpPanelOpen} />
                </div>

                <div ref={confirmRidePopUpPanelRef} className='fixed bottom-0 translate-y-full z-10 bg-white w-full h-screen px-3 py-6 pt-10'>
                    <ConfirmRideCaptain ride={ride} setConfirmRidePopUpPanelOpen={setConfirmRidePopUpPanelOpen} setRidePopUpPanelOpen={setRidePopUpPanelOpen} />
                </div>

            </div>
        </div>
    )
}

export default CaptainHome