import React from 'react'
import { GoLocation } from 'react-icons/go'

const LocationSearchPanel = ({ setLocationPanelOpen, setVehiclePanelOpen }) => {
  const location = [
    '332, Near Kali Devi Temple, Tibba Colony, Ratia - 125051',
    '55th and 11th, Hell\'s Kitchen, New York',
    'GMSSS, Sector-7, Panchkula - 144027',
    'Kavita Beuty Parlour, Shakti Nagar, Ratia - 125051'
  ]
  return (
    <div>
      {/* This is sample data */}
      {
        location.map((address, index) => (
          <div
            key={index}
            onClick={() => {
              setVehiclePanelOpen(true)
              setLocationPanelOpen(false)
            }}
            className='my-2 border-2 border-transparent p-2 rounded-xl active:border-black flex items-center justify-start gap-4'>
            <h2 className='bg-[#eee] p-2 rounded-full text-xl'><GoLocation /></h2>
            <h4 className='text-base font-medium'>{address}</h4>
          </div>
        ))
      }
    </div>
  )
}

export default LocationSearchPanel