import React from 'react'

const Header = () => {
    return (
        <section className='flex justify-between items-center'>
            <div className='px-10 py-5 flex items-center gap-2 w-72'>

                <div className='flex items-center justify-center w-9 h-9 bg-blue-600 rounded-md shrink-0'>
                    <h4 className='font-semibold text-white'>TM</h4>
                </div>
                <div className='flex items-center justify-center whitespace-nowrap'>
                    <h1 className='font-semibold'>Task Manager</h1>
                </div>
            </div>
            <div className='flex items-center px-10 py-5'>
                <select name="" id="" className='border-none  font-semibold  outline-none pr-1   rounded-md w-20 h-7  transition-all flex justify-center items-center focus:border-none' >
                    <option value="" className='bg-white text-black'>log out</option>
                    <option value="" className='bg-white text-black'>profile</option>
                </select>
            </div>
        </section>
    )
}

export default Header
