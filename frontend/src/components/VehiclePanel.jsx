import { FaUser } from 'react-icons/fa6'

const VehiclePanel = ({ vehiclePanelRef, setVehiclePanelOpen, setConfirmRidePanelOpen, selectVehicle, fare }) => {
    return (
        <>
            <h5
                ref={vehiclePanelRef}
                onClick={() => setVehiclePanelOpen(false)}
                className='absolute top-2 w-full flex items-center justify-center text-gray-300 p-1 text-2xl'>
                <div className='w-50 h-1 bg-gray-300  rounded-full'></div>
            </h5>
            <h2 className='text-2xl font-semibold mb-5'>Choose your vehicle</h2>
            <div
                onClick={() => {
                    setConfirmRidePanelOpen(true)
                    setVehiclePanelOpen(false)
                    selectVehicle('car')
                }}
                className='w-full border-2 border-gray-400 active:border-black bg-gray-100 rounded-xl p-3 mb-2 flex items-center justify-between'>
                <img className='h-10' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className='ml-2 w-1/2 font-medium'>
                    <h4 className='flex items-center gap-2 text-lg'>UberGo <span className='flex items-center gap-1'><FaUser /> 4</span></h4>
                    <h5 className='text-sm'>2 mins away</h5>
                    <p className='font-normal text-sm text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='font-semibold text-xl mr-2'>₹ {fare.car}</h2>
            </div>
            <div
                onClick={() => {
                    setConfirmRidePanelOpen(true)
                    setVehiclePanelOpen(false)
                    selectVehicle('moto')
                }}
                className='w-full border-2 border-gray-400 active:border-black bg-gray-100 rounded-xl p-3 mb-2 flex items-center justify-between'>
                <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                <div className='ml-2 w-1/2 font-medium'>
                    <h4 className='flex items-center gap-2 text-lg'>Moto <span className='flex items-center gap-1'><FaUser /> 1</span></h4>
                    <h5 className='text-sm'>3 mins away</h5>
                    <p className='font-normal text-sm text-gray-600'>Affordable motorcycle rides</p>
                </div>
                <h2 className='font-semibold text-xl mr-2'>₹ {fare.moto}</h2>
            </div>
            <div
                onClick={() => {
                    setConfirmRidePanelOpen(true)
                    setVehiclePanelOpen(false)
                    selectVehicle('auto')
                }}
                className='w-full border-2 border-gray-400 active:border-black bg-gray-100 rounded-xl p-3 mb-2 flex items-center justify-between'>
                <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                <div className='ml-2 w-1/2 font-medium'>
                    <h4 className='flex items-center gap-2 text-lg'>UberAuto <span className='flex items-center gap-1'><FaUser /> 3</span></h4>
                    <h5 className='text-sm'>5 mins away</h5>
                    <p className='font-normal text-sm text-gray-600'>Affordable auto rides</p>
                </div>
                <h2 className='font-semibold text-xl mr-2'>₹ {fare.auto}</h2>
            </div>
        </>
    )
}

export default VehiclePanel