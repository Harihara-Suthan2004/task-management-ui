import React from 'react'
import { NavLink } from 'react-router-dom'
import progressbar from '../assets/Images/progressIcon.png'
import usericon from '../assets/Images/usericon.png'
import projecticon from '../assets/Images/projecticon.png'
function Sidebar() {
  const navlinkstyles = ({ isActive }) => {
    return `w-1/2 rounded-md px-2 py-1 transition-all ${isActive ? 'bg-gray-400' : 'hover:bg-gray-100 text-gray-600'
      }`
  }
  return (
    <div className='flex flex-col gap-7 p-4 py-8'>
      <div className='w-52 flex items-center gap-1.5'>
        <img src={progressbar} alt="progressimage" className='w-5 h-5' />
        <div className=' w-1/2 rounded-md'>
          <NavLink to="/" className={navlinkstyles} end>Dashboard</NavLink>
        </div>

      </div>
      <div className='w-52  flex items-center gap-1.5'>
        <img src={usericon} alt="progressimage" className='w-5 h-5' />
        <div className=' w-1/2 rounded-md'>
          <NavLink to="/User" className={navlinkstyles}>User</NavLink>
        </div>
      </div>
      <div className='w-52  flex items-center gap-1.5'>
        <img src={projecticon} alt="progressimage" className='w-5 h-5' />
        <div className=' w-1/2 rounded-md'>
          <NavLink to="/Project" className={navlinkstyles}>Project</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
