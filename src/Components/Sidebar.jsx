import React from 'react'
import { NavLink } from 'react-router-dom'
import progressbar from '../assets/Images/progressIcon.png'
import usericon from '../assets/Images/usericon.png'
import projecticon from '../assets/Images/projecticon.png'
function Sidebar() {
  const navlinkstyles = ({ isActive }) => {
    return `w-full rounded-md px-2 py-1 transition-all ${isActive ? 'bg-[#ebe8e8]' : 'hover:bg-gray-100 text-gray-600'
      }`
  }
  return (
    <div className='flex flex-col gap-7 p-4 py-8'>
      <NavLink to="/" className={navlinkstyles} end>
      <div className='w-52 flex items-center gap-1.5'>
        <img src={progressbar} alt="progressimage" className='w-5 h-5' />
        <div className=' w-1/2 rounded-md'>
          Dashboard
        </div>
        
      </div>
      </NavLink>
      <NavLink to="/User" className={navlinkstyles}>
      <div className='w-52  flex items-center gap-1.5'>
        <img src={usericon} alt="progressimage" className='w-5 h-5' />
        <div className=' w-1/2 rounded-md'>
          User
        </div>
      </div>
      </NavLink>
      <NavLink to="/Project" className={navlinkstyles}>
      <div className='w-52  flex items-center gap-1.5'>
        <img src={projecticon} alt="progressimage" className='w-5 h-5' />
        <div className=' w-1/2 rounded-md'>
          Project
        </div>
      </div>
      </NavLink>
    </div>
  )
}

export default Sidebar
