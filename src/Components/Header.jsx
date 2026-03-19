import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

   const handleLogout = () => {
    setOpen(false)   // ✅ close dropdown
    console.log("logout clicked")

    // clear auth
    localStorage.removeItem("token")

    navigate("/") // redirect
}
    return (
        <section className='flex justify-between items-center pb-1 border-gray-300 border-b'>

            {/* Left */}
            <div className='px-10 py-5 flex items-center gap-2 w-72'>
                <div className='flex items-center justify-center w-9 h-9 bg-blue-600 rounded-md'>
                    <h4 className='font-semibold text-white'>TM</h4>
                </div>
                <h1 className='font-semibold'>Task Manager</h1>
            </div>

            {/* Right */}
            <div className='relative px-10 py-5'>

                <button
                    onClick={() => setOpen(!open)}
                    className='font-semibold '
                >
                    Test Admin ▾
                </button>

                {open && (
                    <div className='absolute right-10 mt-2 w-32 bg-white shadow-md rounded-md border'>
                        
                        <button
                            onClick={() => {
                                navigate("/profile")
                                setOpen(false)
                            }}
                            className='block w-full text-left px-4 py-2 hover:bg-gray-100'
                        >
                            Profile
                        </button>

                        <button
                            onClick={handleLogout}
                            className='block w-full text-left px-4 py-2 hover:bg-gray-100'
                        >
                            Logout
                        </button>

                    </div>
                )}

            </div>

        </section>
    )
}

export default Header