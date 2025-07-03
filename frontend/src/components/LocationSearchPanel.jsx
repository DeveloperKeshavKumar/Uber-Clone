import React, { useEffect } from 'react'
import { GoLocation } from 'react-icons/go'

const LocationSearchPanel = ({ setLocationPanelOpen, setVehiclePanelOpen, suggestions, activeField, setPickup, setDestination }) => {

  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion.description)
    } else if (activeField === 'destination') {
      setDestination(suggestion.description)
    }

    // setVehiclePanelOpen(true)
    // setLocationPanelOpen(false)
  }

  return (
    <div>
      {/* This is sample data */}
      {
        suggestions.map((address, index) => (
          <div
            key={index}
            onClick={() => { handleSuggestionClick(address) }}
            className='my-2 border-2 border-transparent p-2 rounded-xl active:border-black flex items-center justify-start gap-4'>
            <h2 className='bg-[#eee] p-2 rounded-full text-xl'><GoLocation /></h2>
            <h4 className='text-base font-medium'>{address?.description}</h4>
          </div>
        ))
      }
    </div>
  )
}

export default LocationSearchPanel