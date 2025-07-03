import React, { useContext, useEffect } from 'react'
import { BiTime } from 'react-icons/bi'
import { TbBrandSpeedtest, TbNote } from 'react-icons/tb'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext)
    useEffect(() => { console.log(captain) }, [captain])

    return (
        <div className='p-6'>
            <div className='flex justify-between items-center'>
                <div className='flex justify-start items-center gap-4'>
                    {/* User Image */}
                    <img className='h-10 w-10 border rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" />
                    <h4 className='text-lg font-medium capitalize'>{captain.fullName.firstName + " " + captain.fullName.lastName}</h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>₹ 195.20</h4>
                    <p className='text-xm text-gray-600'>Earned</p>
                </div>
            </div>
            <div className='mt-6 p-3 bg-gray-100 rounded-xl flex justify-evenly items-center text-center'>
                <div>
                    <BiTime className='text-3xl mb-2' />
                    <h5 className='text-lg font-medium'>10.2 hrs</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div>
                    <TbBrandSpeedtest className='text-3xl mb-2' />
                    <h5 className='text-lg font-medium'>10.2 hrs</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div>
                    <TbNote className='text-3xl mb-2' />
                    <h5 className='text-lg font-medium'>10.2 hrs</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails