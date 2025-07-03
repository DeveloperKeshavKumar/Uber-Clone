import React, { useRef, useState, useContext, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router'
import { FaUser, FaArrowDown } from 'react-icons/fa6'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingNearby from '../components/LookingNearbyPanel'
import WaitingForDriver from '../components/WaitingForDriver'
import LiveTracking from '../components/LiveTracking'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

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

  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)

  // Debounce timer refs
  const pickupDebounceRef = useRef(null)
  const destinationDebounceRef = useRef(null)

  const SERVER_URL = import.meta.env.VITE_ENV === 'development' ? import.meta.env.VITE_SERVER_URL_DEV : import.meta.env.VITE_SERVER_URL

  const navigate = useNavigate()
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user.id })
  }, [user])

  socket.on('ride-confirmed', ride => {
    setLookingNearbyPanelOpen(false)
    setWaitingForDriverPanelOpen(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    console.log("ride")
    setWaitingForDriverPanelOpen(false)
    navigate('/riding', { state: { ride } })
  })

  // Debounced API call function
  const fetchSuggestions = useCallback(async (input, type) => {
    if (!input.trim()) {
      if (type === 'pickup') {
        setPickupSuggestions([])
      } else {
        setDestinationSuggestions([])
      }
      return
    }

    try {
      const response = await axios.get(`${SERVER_URL}/maps/suggestions`, {
        params: { input },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (type === 'pickup') {
        setPickupSuggestions(response.data)
      } else {
        setDestinationSuggestions(response.data)
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }, [SERVER_URL])

  const handlePickupChange = (e) => {
    const value = e.target.value
    setPickup(value)

    // Clear previous debounce timer
    if (pickupDebounceRef.current) {
      clearTimeout(pickupDebounceRef.current)
    }

    // Set new debounce timer
    pickupDebounceRef.current = setTimeout(() => {
      fetchSuggestions(value, 'pickup')
    }, 300) // 300ms delay
  }

  const handleDestinationChange = (e) => {
    const value = e.target.value
    setDestination(value)

    // Clear previous debounce timer
    if (destinationDebounceRef.current) {
      clearTimeout(destinationDebounceRef.current)
    }

    // Set new debounce timer
    destinationDebounceRef.current = setTimeout(() => {
      fetchSuggestions(value, 'destination')
    }, 300) // 300ms delay
  }

  // Cleanup debounce timers on unmount
  useEffect(() => {
    return () => {
      if (pickupDebounceRef.current) {
        clearTimeout(pickupDebounceRef.current)
      }
      if (destinationDebounceRef.current) {
        clearTimeout(destinationDebounceRef.current)
      }
    }
  }, [])

  const submitHandler = (e) => {
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

  async function findTrip() {
    setVehiclePanelOpen(true)
    setLocationPanelOpen(false)

    const response = await axios.get(`${SERVER_URL}/ride/fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setFare(response.data)
  }

  async function createRide() {
    const response = await axios.post(`${SERVER_URL}/ride/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  return (
    <div className='h-screen relative overflow-hidden'>
      <nav className='flex items-center justify-between p-5'>
        <img className='w-20' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to={'/user'}>
          <FaUser size={24} />
        </Link>
      </nav>

      <div
        className='h-screen w-screen'>
        <LiveTracking />
      </div>

      <div className='flex flex-col justify-end h-screen absolute w-full top-0'>
        <div className='h-[25%] bg-white p-6 relative'>
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setLocationPanelOpen(false)
              setPickup('')
              setDestination('')
              // Clear suggestions when closing panel
              setPickupSuggestions([])
              setDestinationSuggestions([])
              // Clear any pending debounce timers
              if (pickupDebounceRef.current) {
                clearTimeout(pickupDebounceRef.current)
              }
              if (destinationDebounceRef.current) {
                clearTimeout(destinationDebounceRef.current)
              }
            }}
            className='absolute top-6 right-6 opacity-0 text-2xl'>
            <FaArrowDown />
          </h5>
          <h2 className='text-3xl font-semibold'>Find a Trip</h2>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className='h-16 w-1 line absolute top-[42%] left-10 bg-gray-700 rounded-full'></div>
            <input
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
              type="text"
              placeholder='Add pick-up location'
              value={pickup}
              onChange={handlePickupChange}
              onClick={() => {
                setLocationPanelOpen(true)
                setActiveField('pickup')
              }} />
            <input
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
              type="text"
              placeholder='Enter your destination'
              value={destination}
              onChange={handleDestinationChange}
              onClick={() => {
                setLocationPanelOpen(true)
                setActiveField('destination')
              }} />
            {locationPanelOpen && (
              <button type="submit" onClick={findTrip} className='bg-black text-white text-xl rounded-lg px-4 py-2 w-full my-5'>Find Trip</button>
            )}
          </form>
        </div>
        <div ref={panelRef} className='h-0 bg-white p-5 '>
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setLocationPanelOpen={setLocationPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed bottom-0 translate-y-full z-10 bg-white w-full px-3 py-10 pt-12'>
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          vehiclePanelRef={vehiclePanelRef}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          setVehiclePanelOpen={setVehiclePanelOpen}
        />
      </div>

      <div ref={confirmRideRef} className='fixed bottom-0 translate-y-full z-10 bg-white w-full px-3 py-6 pt-12'>
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          confirmRideRef={confirmRideRef}
          setLookingNearbyPanelOpen={setLookingNearbyPanelOpen}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
        />
      </div>

      <div ref={lookingNearbyRef} className='fixed bottom-0 translate-y-full z-10 bg-white w-full px-3 py-6 pt-10'>
        <LookingNearby
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          lookingNearbyRef={lookingNearbyRef}
          setLookingNearbyPanelOpen={setLookingNearbyPanelOpen} />
      </div>

      <div ref={waitingforDriverRef} className='fixed bottom-0 translate-y-full z-10 bg-white w-full px-3 py-6 pt-10'>
        <WaitingForDriver
          ride={ride}
          waitingForDriverRef={waitingforDriverRef}
          waitingForDriverPanelOpen={waitingForDriverPanelOpen}
          setWaitingForDriverPanelOpen={setWaitingForDriverPanelOpen} />
      </div>
    </div>
  )
}

export default Home