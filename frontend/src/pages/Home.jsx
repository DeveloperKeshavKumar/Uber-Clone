import React, { useRef, useState } from 'react'
import { Link } from 'react-router'
import { FaUser, FaArrowDown } from 'react-icons/fa6'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingNearby from '../components/LookingNearbyPanel'
import WaitingForDriver from '../components/WaitingForDriver'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [locationPanelOpen, setLocationPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false)
  const confirmRideRef = useRef(null)
  const [LookingNearbyPanelOpen, setLookingNearbyPanelOpen] = useState(false)
  const lookingNearbyRef = useRef(null)
  const [waitingForDriverPanelOpen, setWaitingForDriverPanelOpen] = useState(false)
  const waitingforDriverRef = useRef(null)


  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  useGSAP(() => {
    if (locationPanelOpen) {
      gsap.to(panelRef.current, {
        height: '78%'
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%'
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [locationPanelOpen])

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanelOpen])

  useGSAP(() => {
    if (confirmRidePanelOpen) {
      gsap.to(confirmRideRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRideRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanelOpen])

  useGSAP(() => {
    if (LookingNearbyPanelOpen) {
      gsap.to(lookingNearbyRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(lookingNearbyRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [LookingNearbyPanelOpen])

  useGSAP(() => {
    if (waitingForDriverPanelOpen) {
      gsap.to(waitingforDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingforDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriverPanelOpen])

  return (
    <div className='h-screen relative overflow-hidden'>
      <nav className='flex items-center justify-between p-5'>
        <img className='w-20' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to={'/user'}>
          <FaUser size={24} />
        </Link>
      </nav>

      <div
        onClick={() => {
          setVehiclePanelOpen(false),
            setLocationPanelOpen(false)
        }}
        className='h-screen w-screen -mt-20'>
        {/* Image for temporary use */}
        <img src="/Uber-Get-Started.png" alt=" temporary image" className='w-full h-full object-contain' />
      </div>

      <div className='flex flex-col justify-end h-screen absolute w-full top-0'>
        <div className='h-[25%] bg-white p-6 relative'>
          <h5
            ref={panelCloseRef}
            onClick={() => setLocationPanelOpen(false)}
            className='absolute top-6 right-6 opacity-0 text-2xl'>
            <FaArrowDown />
          </h5>
          <h2 className='text-3xl font-semibold'>Find a Trip</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className='h-16 w-1 line absolute top-[42%] left-10 bg-gray-700 rounded-full'></div>
            <input
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
              type="text"
              placeholder='Add pick-up location'
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => setLocationPanelOpen(true)} />
            <input
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
              type="text"
              placeholder='Enter your destination'
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => setLocationPanelOpen(true)} />
            <button type="submit"></button>
          </form>
        </div>
        <div ref={panelRef} className='h-0 bg-white px-5 -mt-2'>
          <LocationSearchPanel setLocationPanelOpen={setLocationPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed bottom-0 translate-y-full z-10 bg-white w-full px-3 py-10 pt-12'>
        <VehiclePanel vehiclePanelRef={vehiclePanelRef} setConfirmRidePanelOpen={setConfirmRidePanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
      </div>

      <div ref={confirmRideRef} className='fixed bottom-0 translate-y-full z-10 bg-white w-full px-3 py-6 pt-12'>
        <ConfirmRide confirmRideRef={confirmRideRef} setLookingNearbyPanelOpen={setLookingNearbyPanelOpen} setConfirmRidePanelOpen={setConfirmRidePanelOpen} />
      </div>

      <div ref={lookingNearbyRef} className='fixed bottom-0 translate-y-full z-10 bg-white w-full px-3 py-6 pt-10'>
        <LookingNearby lookingNearbyRef={lookingNearbyRef} setLookingNearbyPanelOpen={setLookingNearbyPanelOpen} />
      </div>

      <div ref={waitingforDriverRef} className='fixed bottom-0 translate-y-full z-10 bg-white w-full px-3 py-6 pt-10'>
        <WaitingForDriver waitingForDriverRef={waitingforDriverRef} setWaitingForDriverPanelOpen={setWaitingForDriverPanelOpen} />
      </div>
    </div>
  )
}

export default Home 