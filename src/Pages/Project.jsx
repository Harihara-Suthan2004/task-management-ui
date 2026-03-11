import React, { useState } from 'react'
import PageTitle from '../Components/PageTitle'
import filtericon from '../assets/images/FilterIcon.png'
import { useProject } from '../Context/ProjectContext'
import ViewIcon from '../assets/images/ViewIcon.png'
import EditIcon from '../assets/images/EditIcon.png'
import DeleteIcon from '../assets/images/DeleteIcon.png'
import ProjectModel from '../components/ProjectModel'
import ProjectDetails from './ProjectDetails'
import { useNavigate } from 'react-router-dom'

const Project = () => {
  const { allData, loading,deleteProject } = useProject();
  const [isModelOpen,setisModelOpen]=useState(false);
  const navigate=useNavigate();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className='bg-[#ebe8e8] min-h-screen pb-10'>
      <PageTitle onAddClick={()=>setisModelOpen(true)}/>

        {isModelOpen &&(
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg mx-4">
            <ProjectModel onClose={() => setisModelOpen(false)} />
          </div>
        </div>
        )}

      <section className='bg-white mt-7 mx-10 rounded-md shadow-md border border-gray-300  overflow-hidden'>
        <div className='w-full flex justify-between px-10 py-3 bor'>
          <span className='font-semibold text-gray-700'>Total Projects {allData.length}</span>
          <div className='flex items-center justify-center w-9 h-9 bg-[#F8F8F8] hover:bg-gray-100 cursor-pointer rounded-md transition-all border border-gray-200'>
            <img src={filtericon} alt="filter icon" className='w-4 h-4' />
          </div>
        </div>

        <section className='px-10 pt-2 pb-9'>
          <table className='w-full border-collapse border border-gray-200'>
            
            <thead>
              <tr className='bg-[#F8F8F8] border-b border-gray-200'>
                <th className='p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>ID</th>
                <th className='p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Project Title</th>
                <th className='p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/3'>Description</th>
                <th className='p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Manager</th>
                <th className='p-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {allData.map((project) => (
                <tr key={project.id} className=''>
                  <td className='p-4 text-sm'>{project.id}</td>
                  <td className='p-4 text-sm'>{project.project_title}</td>
                  <td className='p-4 text-sm leading-relaxed'>
                    <div className="line-clamp-2">{project.description}</div>
                  </td>
                  <td className='p-4 text-sm text-gray-700 font-medium'>
                    <span className=' px-3 py-1  text-xs'>
                      {project.manager || "Not Assigned"}
                    </span>
                  </td>
                  <td className='p-4 text-center '>
                    <div className='flex justify-center gap-3'>
                        <button>
                      <img src={ViewIcon} alt="" className='w-5 h-5 hover:scale-110 transition-transform cursor-pointer' onClick={()=>navigate(`/Project/${project.id}`)} />
                    </button>
                    <button>
                      <img src={EditIcon} alt="" className='w-5 h-5 cursor-pointer hover:scale-110 transition-transform' />
                    </button>
                    <button onClick={()=>{
                      if(window.confirm("Are you sure want to delete the project")){
                        deleteProject(project.id);
                      }
                    }}>
                      <img src={DeleteIcon} alt="" className='w-5 h-5 cursor-pointer hover:scale-110 transition-transform' />
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </div>
  )
}

export default Project