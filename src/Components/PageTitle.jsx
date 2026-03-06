import React from 'react'
import { useLocation } from 'react-router-dom'

const PageTitle = () => {
        const location=useLocation();
    
    const pageconfig={
        '/':{
            title:'Dashboard',
            button:null
        },
        '/User':{
            title:'User',
            button:<button className='bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors'>Add User</button>
        },
        '/Project':{
            title:'Project',
            button:<button className='bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors'>Add Project</button>
        }
    }
    const currenttitle=pageconfig[location.pathname] || pageconfig['/'];
    return (
        <section className='flex items-center justify-between w-full h-20 border border-gray-300 rounded-2xl bg-white shadow-md'>
            <div className='flex item-center justify-center w-1/4 '>
                <span className='font-semibold text-3xl'>{currenttitle.title}</span>
            </div>

            <div className='flex items-center px-7'>
                {currenttitle.button}
            </div>
        </section>
    )
}

export default PageTitle
