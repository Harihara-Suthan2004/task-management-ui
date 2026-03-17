import React, { useState } from 'react'
import { useProject } from '../Context/ProjectContext'
import { useNavigate, useParams } from 'react-router-dom'
import BackArrowIcon from '../assets/images/BackArrowIcon.png'
import filtericon from '../assets/images/FilterIcon.png'
import ViewIcon from '../assets/images/ViewIcon.png'
import DeleteIcon from '../assets/images/DeleteIcon.png'
import TaskModel from '../components/TaskModel'

const ProjectDetails = () => {
    const [visible,setvisible]=useState(false);
    const { id } = useParams();
    const { allData } = useProject();
    const navigate = useNavigate();

    // Use == to allow string/number comparison or cast both to String
    const project = allData.find(p => String(p.id) === String(id));

    if (!project) return <div className="p-20 text-center text-red-500">Project not found.</div>;

    // Helper function to get User Name from the ID in the task
    const getUserName = (userId) => {
        const user = project.users?.find(u => u.id === userId);
        return user ? user.name : "Unassigned";
    };

    return (
        <div className={`flex flex-col ${visible ? 'overflow-hidden h-screen' : ''}`}>
            {visible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    {/* The TaskModel inside a white container */}
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-8">
                        <button 
                            onClick={() => setvisible(false)} 
                            className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
                        >
                            &times;
                        </button>
                        <TaskModel onClose={()=>setvisible(false)} projectData={project}/>
                    </div>
                </div>
            )}
            {/* Header Section */}
            <section className='flex w-full justify-between items-center px-12 h-20 border-gray-300 rounded-2xl border shadow-md bg-white p-3'>
                <div className='flex items-center p-2'>
                    <img src={BackArrowIcon} alt="back" className='w-8 h-8 hover:bg-gray-300 rounded-full mr-7 cursor-pointer' onClick={() => navigate('/Project')} />
                    <span className='font-semibold text-2xl'>{project.project_title} — Tasks ({project.tasks.length})</span>
                </div>
                <button onClick={()=>setvisible(true)} className='bg-blue-600 h-10 text-white px-4 py-1 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors'>
                    Add Task
                </button>
            </section>

            <section className='flex flex-col mt-10 bg-white border border-gray-200 rounded-xl shadow-sm p-6'>
                {/* Table Header Controls */}
                <div className='flex w-full justify-between items-center mb-6'>
                    <span className='text-gray-400 text-sm'>
                        Showing {project.tasks.length} tasks
                    </span>
                    <div className='flex items-center justify-center w-9 h-9 bg-white hover:bg-gray-50 cursor-pointer rounded-md transition-all border border-gray-200 shadow-sm'>
                        <img src={filtericon} alt="filter" className='w-4 h-4' />
                    </div>
                </div>

                {/* Table */}
                <table className='w-full border-collapse border border-gray-200'>
                    <thead>
                        <tr className="bg-[#F8F8F8] border-b border-gray-200">
                            <th className="p-4 text-center text-xs font-semibold text-gray-500 uppercase">Task ID</th>
                            <th className="p-4 text-center text-xs font-semibold text-gray-500 uppercase">Assigned By</th>
                            <th className="p-4 text-center text-xs font-semibold text-gray-500 uppercase">Title</th>
                            <th className="p-4 text-center text-xs font-semibold text-gray-500 uppercase">Assigned To</th>
                            <th className="p-4 text-center text-xs font-semibold text-gray-500 uppercase">Status</th>
                            <th className="p-4 text-center text-xs font-semibold text-gray-500 uppercase">Priority</th>
                            <th className="p-4 text-center text-xs font-semibold text-gray-500 uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {project.tasks.length > 0 ? (
                            project.tasks.map((task) => (
                                <tr key={task.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 text-sm text-gray-600 text-center">{task.id}</td>
                                    <td className="py-4 text-sm text-gray-600 text-center font-medium">
                                        {project.manager || "N/A"}</td>
                                    <td className="py-4 text-sm text-gray-600 text-center">{task.task_name}</td>
                                    {/* USE THE HELPER HERE TO SHOW NAME INSTEAD OF u101 */}
                                    <td className="py-4 text-sm text-gray-600 text-center font-semibold">
                                        {getUserName(task.user_id)}
                                    </td>
                                    <td className="py-4 text-sm text-center">
                                        <span className='bg-gray-100 px-3 py-1 rounded-full text-gray-600 border border-gray-200 text-xs uppercase'>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="py-4 text-sm text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                            task.priority === 'high' ? 'bg-red-100 text-red-600' :
                                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700':
                                            'bg-blue-100 text-blue-600'
                                        }`}>
                                            {task.priority}
                                        </span>
                                    </td>
                                    <td className='py-4 text-center'>
                                        <div className='flex justify-center gap-4'>
                                            <button className='hover:scale-110 transition-transform cursor-pointer'
                                            onClick={() => navigate(`/Project/${id}/task/${task.id}`)}
                                            ><img src={ViewIcon} alt="view" /></button>
                                            <button className='hover:scale-110 transition-transform cursor-pointer'><img src={DeleteIcon} alt="delete" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="py-20 text-center text-gray-400">No tasks found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default ProjectDetails
