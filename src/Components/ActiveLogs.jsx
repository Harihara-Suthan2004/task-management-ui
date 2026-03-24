import React from 'react'
import { LuDownload } from "react-icons/lu";
import { LuTrash2 } from 'react-icons/lu';

const ActiveLogs = () => {
  return (
    <div className='grid grid-cols-1 gap-4'>
      <div className='flex justify-end gap-2'>
        <button className='bg-green-400 flex items-center justify-center rounded-md w-6 h-6'>
          <LuDownload className="text-white w-5 h-5" />
        </button>
        <button className='bg-red-500 flex items-center justify-center rounded-md w-6 h-6'>
          <LuTrash2 className='text-white w-5 h-5' />
        </button>
      </div>
      <div className='w-full bg-gray-200 rounded-md shadow-md'>
        <div className='w-full grid grid-cols-1'>
          <div className=' w-full flex justify-between px-2'>
            <span className='text-gray-500'>Task Uploaded: Priority is updated from medium to high</span>
            <span className='text-gray-500'>02/01/2026 : 12:00:14 am</span>
          </div>

          <span className='text-gray-500 px-2'>By: Test Admin</span>
        </div>
      </div>
    </div>
  )
}

export default ActiveLogs
