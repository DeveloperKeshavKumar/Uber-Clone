import React from 'react'
import {  BiHome } from 'react-icons/bi'
import { Fa6 } from 'react-icons/fa6'
import { GoLocation } from 'react-icons/go'
import { RiCashLine, RiTaxiFill } from 'react-icons/ri'
import { Link } from 'react-router'

const Riding = () => {
  return (
    <div className='h-screen'>
      <Link to={'/home'} className='fixed right-2 top-2 w-10 h-10 flex items-center justify-center rounded-full bg-white'>
        <BiHome className='text-xl font-medium'/>
      </Link>
      <div className='h-1/2'>
        <img src="/Uber-Get-Started.png" alt=" temporary image" className='w-full h-full' />
      </div>
      <div className='h-1/2 p-4'>
        <div className='flex items-center justify-between px-12'>
                <RiTaxiFill className='text-5xl' />
                <div className='text-right'>
                    <h2 className='text-lg font-medium'>Sarthak</h2>
                    <h4 className='text-xl font-semibold -my-1'>HR-59-AX-1111</h4>
                    <p className='text-sm text-gray-600'>Maruti Suzuki Alto </p>
                </div>
            </div>
            <div className="flex flex-col gap-5 justify-center items-center">
                <div className="w-full">
                    <div
                        className='my-2 p-2 pb-4 border-gray-300 border-b-2 flex items-center justify-start gap-4'>
                        <h2 className='bg-[#eee] p-2 rounded-full text-xl'><GoLocation /></h2>
                        <h4 className='text-base font-medium'>332, Near Kali Devi Temple, Tibba Colony, Ratia - 125051332, Near Kali Devi Temple, Tibba Colony, Ratia - 125051</h4>
                    </div>
                    <div className='my-2 p-2 pb-4 flex items-center justify-start gap-4'>
                        <h2 className='bg-[#eee] p-2 rounded-full text-xl'><RiCashLine /></h2>
                        <h4 className='text-base font-medium'>₹ 119.20</h4>
                    </div>
                </div>
            </div>
        <button 

        className="w-full bg-green-600 text-white font-semibold text-xl p-2 mb-3 rounded-lg">Make a payment</button>
      </div>
    </div>
  )
}

export default Riding