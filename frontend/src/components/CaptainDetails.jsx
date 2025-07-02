import React from 'react'
import {  BiTime } from 'react-icons/bi'
import { TbBrandSpeedtest, TbNote } from 'react-icons/tb'

const CaptainDetails = () => {
    return (
        <div className='p-6'>
            <div className='flex justify-between items-center'>
                <div className='flex justify-start items-center gap-4'>
                    {/* User Image */}
                    <img className='h-10 w-10 border rounded-full object-cover' src="/Uber-Get-Started.png" alt="" />
                    <h4 className='text-lg font-medium'>Karthik Goyal</h4>
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