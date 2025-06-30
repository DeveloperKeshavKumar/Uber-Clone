import { FaUser } from 'react-icons/fa6'
import { TfiCar } from 'react-icons/tfi'
import { TbMotorbike } from 'react-icons/tb'
import { RiTaxiFill } from 'react-icons/ri'

const VehiclePanel = ({ vehiclePanelRef, setVehiclePanelOpen, setConfirmRidePanelOpen }) => {
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
                }}
                className='w-full border-2 border-gray-400 active:border-black bg-gray-100 rounded-xl p-3 mb-2 flex items-center justify-between'>
                <h3 className='h-20 w-20 flex items-baseline justify-center'><RiTaxiFill className='text-7xl' /></h3>
                <div className='ml-2 w-1/2 font-medium'>
                    <h4 className='flex items-center gap-2 text-lg'>UberGo <span className='flex items-center gap-1'><FaUser /> 4</span></h4>
                    <h5 className='text-sm'>2 mins away</h5>
                    <p className='font-normal text-sm text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='font-semibold text-xl mr-2'>₹ 193.20</h2>
            </div>
            <div
                onClick={() => {
                    setConfirmRidePanelOpen(true)
                    setVehiclePanelOpen(false)
                }}
                className='w-full border-2 border-gray-400 active:border-black bg-gray-100 rounded-xl p-3 mb-2 flex items-center justify-between'>
                <h3 className='h-20 w-20 flex items-baseline justify-center'><TbMotorbike className='text-7xl' /></h3>
                <div className='ml-2 w-1/2 font-medium'>
                    <h4 className='flex items-center gap-2 text-lg'>Moto <span className='flex items-center gap-1'><FaUser /> 1</span></h4>
                    <h5 className='text-sm'>3 mins away</h5>
                    <p className='font-normal text-sm text-gray-600'>Affordable motorcycle rides</p>
                </div>
                <h2 className='font-semibold text-xl mr-2'>₹ 66.75</h2>
            </div>
            <div
                onClick={() => {
                    setConfirmRidePanelOpen(true)
                    setVehiclePanelOpen(false)
                }}
                className='w-full border-2 border-gray-400 active:border-black bg-gray-100 rounded-xl p-3 mb-2 flex items-center justify-between'>
                <h3 className='h-20 w-20 flex items-baseline justify-center'><TfiCar className='text-7xl' /></h3>
                <div className='ml-2 w-1/2 font-medium'>
                    <h4 className='flex items-center gap-2 text-lg'>UberAuto <span className='flex items-center gap-1'><FaUser /> 3</span></h4>
                    <h5 className='text-sm'>5 mins away</h5>
                    <p className='font-normal text-sm text-gray-600'>Affordable auto rides</p>
                </div>
                <h2 className='font-semibold text-xl mr-2'>₹ 118.91</h2>
            </div>
        </>
    )
}

export default VehiclePanel