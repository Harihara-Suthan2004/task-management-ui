import React from 'react'
import { useProject } from '../Context/ProjectContext'
import { useNavigate, useParams } from 'react-router-dom'
import BackArrowIcon from '../assets/images/BackArrowIcon.png'
import filtericon from '../assets/images/FilterIcon.png'
import ViewIcon from '../assets/images/ViewIcon.png'
import DeleteIcon from '../assets/images/DeleteIcon.png'
const ProjectDetails = () => {
    const { id } = useParams();
    const { allData } = useProject();
    const navigate = useNavigate();

    const project = allData.find(p => p.project_id == parseInt(id));

    if (!project) return <div>Project not found.</div>
    return (
        <div className='flex flex-col'>
            {/* header section */}

            <section className='flex w-full justify-between items-center px-12 h-20 border-gray-300 rounded-2xl border shadow-md bg-white p-3'>
                <div className='flex items-center p-2'>
                    <img src={BackArrowIcon} alt="" className='w-8 h-8 hover:bg-gray-300 rounded-full mr-7 cursor-pointer' onClick={() => navigate('/Project')} />
                    <span className='font-semibold text-2xl'>{project.project_title} - Task Count -  {project.tasks.length}</span>
                </div>
                <button className='bg-blue-600 h-8 text-white px-4 py-1 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors'>
                    <span>Add Task</span>
                </button>
            </section>



            <section className='flex flex-col mt-10 bg-white border border-gray-200 rounded-xl shadow-sm p-6'>

                {/* Table Header Controls */}
                <div className='flex w-full justify-between items-center mb-6'>
                    <div>
                        <span className='text-gray-400 text-sm'>
                            Showing 1 to {project.tasks.length > 0 ? project.tasks.length : 0} of projects
                        </span>
                    </div>
                    <div className='flex items-center justify-center w-9 h-9 bg-white hover:bg-gray-50 cursor-pointer rounded-md transition-all border border-gray-200 shadow-sm'>
                        <img src={filtericon} alt="filter" className='w-4 h-4' />
                    </div>
                </div>

                {/* Table */}
                <section className='px-10 pt-2 pb-9'>


                    <table className='w-full border-collapse border border-gray-200'>
                        <thead>
                            <tr className="bg-[#F8F8F8] border-b border-gray-200">
                                <th className="p-4  text-center text-xs font-semibold text-gray-500 uppercase tracking-wider ">ID</th>
                                <th className="p-4  text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Assigned By</th>
                                <th className="p-4  text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="p-4  text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="p-4  text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                                <th className="p-4  text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {project.tasks.length > 0 ? (
                                project.tasks.map((task) => (
                                    <tr key={task.id} className="border-b border-gray-50 last:border-0 transition-colors">
                                        <td className="py-4 text-sm text-gray-600 text-center">{task.id}</td>
                                        {/* Add other task cells here */}
                                        <td className="py-4 text-sm text-gray-600 text-center">{task.task_name}</td>
                                        <td className="py-4 text-sm text-gray-600 text-center">{task.user}</td>
                                        <td className="py-4 text-sm text-gray-600 text-center"><span className='bg-gray-400 px-2 py-1 rounded-full text-white'>{task.status}</span></td>
                                        <td className="py-4 text-sm text-gray-600 text-center"><span
                                            className={`px-2 py-1 rounded-full text-sm
  ${task.priority === 'high'
                                                    ? 'bg-red-100 text-red-600'
                                                    : task.priority === 'medium'
                                                        ? 'bg-yellow-100 text-yellow-600'
                                                        : task.priority === 'low'
                                                            ? 'bg-blue-100 text-blue-600'
                                                            : 'bg-gray-100 text-gray-600'
                                                }`}
                                        >
                                            {task.priority}
                                        </span></td>

                                        <td className='py-4 text-sm text-gray-600 text-center'>
                                            <div className='flex justify-center'>
                                                <button className='mr-5'>
                                                    <img src={ViewIcon} alt="" />
                                                </button>
                                                <button>
                                                    <img src={DeleteIcon} alt="" />
                                                </button>


                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-24 text-center">
                                        <p className="text-gray-400 text-sm">No tasks found for this project.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </section>
            </section>

        </div>
    )
}

export default ProjectDetails
