import { BiCurrentLocation } from "react-icons/bi"
import { GoLocation } from "react-icons/go"
import { RiTaxiFill, RiCashLine } from "react-icons/ri"

const ConfirmRide = ({ conformRidePanelRef, setConfirmRidePanelOpen, setLookingNearbyPanelOpen, pickup, destination, fare, vehicleType, createRide }) => {
    return (
        <>
            <h5
                ref={conformRidePanelRef}
                onClick={() => setConfirmRidePanelOpen(false)}
                className='absolute top-2 w-full flex items-center justify-center text-gray-400 p-1 text-2xl'>
                <div className='w-50 h-1 bg-gray-300  rounded-full'></div>
            </h5>
            <h2 className='text-2xl text-center font-semibold mb-5'>Confirm your ride</h2>
            <div className="flex flex-col gap-5 justify-center items-center relative">
                <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className="w-full">
                    <div
                        className='my-2 p-2 pb-4 border-gray-300 border-b-2 flex items-center justify-start gap-4'>
                        <h2 className='bg-[#eee] p-2 rounded-full text-xl'><BiCurrentLocation /></h2>
                        <p className='text-sm -mt-1 text-gray-600'>{pickup}</p>
                    </div>
                    <div
                        className='my-2 p-2 pb-4 border-gray-300 border-b-2 flex items-center justify-start gap-4'>
                        <h2 className='bg-[#eee] p-2 rounded-full text-xl'><GoLocation /></h2>
                        <p className='text-sm -mt-1 text-gray-600'>{destination}</p>
                    </div>
                    <div className='my-2 p-2 pb-4 flex items-center justify-start gap-4'>
                        <h2 className='bg-[#eee] p-2 rounded-full text-xl'><RiCashLine /></h2>
                        <h4 className='text-base font-medium'>₹ {fare[vehicleType]}</h4>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setConfirmRidePanelOpen(false)
                        setLookingNearbyPanelOpen(true)
                        createRide()
                    }}
                    className="w-full bg-green-600 text-white font-semibold text-xl p-2 mb-3 rounded-lg">Confirm</button>
            </div>
        </>
    )
}

export default ConfirmRide