import React, { useState } from 'react'
import { useProject } from '../Context/ProjectContext'
import { useNavigate, useParams } from 'react-router-dom'
import BackArrowIcon from '../assets/images/BackArrowIcon.png'
import filtericon from '../assets/images/FilterIcon.png'
import ViewIcon from '../assets/images/ViewIcon.png'
import DeleteIcon from '../assets/images/DeleteIcon.png'
import TaskModel from '../components/TaskModel'
import Filter from '../components/Filter'

const ProjectDetails = () => {
    const [visible, setvisible] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { id } = useParams();
    const { allData, loading, deleteTask } = useProject();
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        search: "", status: "", priority: "", assignedTo: "", itemsPerPage: "10"
    });

    if (loading) return <div className="p-20 text-center">Loading...</div>;

    const project = allData.find(p => String(p.id) === String(id));

    if (!project) return <div className="p-20 text-center text-red-500">Project not found.</div>;


    const taskList = Array.isArray(project.tasks) ? project.tasks : [];

    const filteredTasks = taskList.filter(task => {
        const matchesSearch = (task?.task_name || "").toLowerCase().includes(filters.search.toLowerCase());
        const matchesStatus = filters.status ? task.status === filters.status : true;
        const matchesPriority = filters.priority ? task.priority === filters.priority : true;
        const matchesUser = filters.assignedTo ? String(task.user_id) === String(filters.assignedTo) : true;
        return matchesSearch && matchesStatus && matchesPriority && matchesUser;
    });

    const handleDeleteTask = (taskId) => {
        if (window.confirm("Delete this task?")) {
            deleteTask(id, taskId);
        }
    };

    //  Safe check for the .find() method
    const getUserName = (userId) => {
        if (!userId) return "Unassigned";
        if (Array.isArray(project.users)) {
            const user = project.users.find(u => String(u.id) === String(userId));
            return user ? user.name : "Unassigned";
        }
        return "Unassigned";
    };

    return (
        <div className={`p-6  min-h-screen ${(visible || isFilterOpen) ? 'overflow-hidden h-screen' : ''}`}>
            {visible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative">
                        <button onClick={() => setvisible(false)} className="absolute top-4 right-4 text-2xl">&times;</button>
                        <TaskModel onClose={() => setvisible(false)} projectData={project} />
                    </div>
                </div>
            )}

            {isFilterOpen && (
                <Filter
                    type="task"
                    onClose={() => setIsFilterOpen(false)}
                    onApply={(data) => setFilters(data)}
                    currentFilters={filters}
                    projectData={project}
                />
            )}

            <header className='flex justify-between items-center bg-white p-5 rounded-xl shadow-sm border border-gray-200'>
                <div className='flex items-center gap-4'>
                    <img src={BackArrowIcon} alt="back" className='w-8 h-8 cursor-pointer' onClick={() => navigate('/Project')} />
                    <h1 className='text-xl font-bold'>{project.project_title} — Tasks ({taskList.length})</h1>
                </div>
                <button onClick={() => setvisible(true)} className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700'>
                    Add Task
                </button>
            </header>

            <section className='mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
                <div className='p-4 flex justify-between items-center'>
                    <span className='text-sm text-gray-500 font-semibold'>Showing {filteredTasks.length} tasks</span>
                    <button onClick={() => setIsFilterOpen(true)} className='p-2 hover:bg-gray-100 rounded-md border border-gray-200 cursor-pointer'>
                        <img src={filtericon} alt="filter" className='w-4 h-4' />
                    </button>
                </div>

                <table className='w-full '>
                    <thead className='bg-[#F8F8F8] border border-gray-200'>
                        <tr>
                            <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Task</th>
                            <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Assigned To</th>
                            <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                            <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Priority</th>
                            <th className="p-4 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {filteredTasks.length > 0 ? (
                            filteredTasks.slice(0, parseInt(filters.itemsPerPage)).map((task) => (
                                <tr key={task.id} className="">
                                    <td className="p-4 text-sm font-medium text-gray-700">{task.task_name}</td>
                                    <td className="p-4 text-sm text-gray-600">{getUserName(task.user_id)}</td>
                                    <td className="p-4">
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded uppercase">{task.status}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${task.priority === 'high' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                                            }`}>
                                            {task.priority}
                                        </span>
                                    </td>
                                    <td className='p-4 flex justify-center gap-3'>
                                        <img src={ViewIcon} onClick={() => navigate(`/project/${id}/task/${task.id}`)} alt="view" className="w-5 cursor-pointer" />
                                        <img src={DeleteIcon} alt="delete" onClick={() => handleDeleteTask(task.id)} className="w-5 cursor-pointer" />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5" className="p-10 text-center text-gray-400">No tasks found.</td></tr>
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default ProjectDetails;