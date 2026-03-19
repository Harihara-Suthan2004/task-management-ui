import React, { useState } from 'react'
import CloseIcon from '../assets/images/CloseIcon.png'

const Filter = ({ onClose, onApply, currentFilters, type = "project", projectData = {} }) => {
    // Local state for all possible fields
    const [formData, setFormData] = useState({
        search: currentFilters.search || "",
        status: currentFilters.status || "",
        priority: currentFilters.priority || "",
        assignedTo: currentFilters.assignedTo || "",
        itemsPerPage: currentFilters.itemsPerPage || "10" 
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleApply = () => {
        onApply(formData);
        onClose();
    };

    return (
        <div className='fixed inset-0 z-10 flex justify-end'>
            <div className='absolute inset-0 bg-black/40 backdrop-blur-sm' onClick={onClose}></div>

            <section className='relative flex flex-col bg-white w-full max-w-1/4 h-screen shadow-2xl animate-slide-in'>
                <div className='flex justify-between items-center px-6 py-6 border-b border-b-gray-300'>
                    <span className='font-bold text-xl text-gray-800 capitalize'>
  {type} Filters
</span>
                    <button onClick={onClose} className='p-2 hover:bg-gray-100 rounded-full cursor-pointer'><img src={CloseIcon} className='w-5 h-5' /></button>
                </div>

                <div className='flex flex-col gap-5 p-6 overflow-y-auto'>
                    {/* Common Search Field */}
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-bold text-gray-500 uppercase'>Search</label>
                        <input name="search" value={formData.search} onChange={handleChange} type="text" placeholder='Search...' className='border border-gray-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500' />
                    </div>

                    {/* Task Specific Fields */}
                    {type === 'task' && (
                        <>
                            <div className='flex flex-col gap-1'>
                                <label className='text-xs font-bold text-gray-500 uppercase'>Status</label>
                                <select name="status" value={formData.status} onChange={handleChange} className='border border-gray-200 rounded-lg p-2.5 outline-none bg-white text-gray-600'>
                                    <option value="">All Statuses</option>
                                    <option value="pending">Pending</option>
                                    <option value="in progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='text-xs font-bold text-gray-500 uppercase'>Priority</label>
                                <select name="priority" value={formData.priority} onChange={handleChange} className='border border-gray-200 rounded-lg p-2.5 outline-none bg-white text-gray-600'>
                                    <option value="">All Priorities</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='text-xs font-bold text-gray-500 uppercase'>Assigned To</label>
                                <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} className='border border-gray-200 rounded-lg p-2.5 outline-none bg-white text-gray-600'>
                                    <option value="">Everyone</option>
                                    {projectData.users?.map(user => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-bold text-gray-500 uppercase'>Items per page</label>
                        <select name="itemsPerPage" value={formData.itemsPerPage} onChange={handleChange} className='border border-gray-200 rounded-lg p-2.5 outline-none bg-white text-gray-600'>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>

                <div className='mt-auto p-6 border-t border-t-gray-300 flex gap-3'>
                    <button onClick={() => {
                        const reset = { search: "", status: "", priority: "", assignedTo: "", itemsPerPage: "10" };
                        setFormData(reset);
                        onApply(reset);
                    }} className='flex-1 border border-gray-400 hover:bg-gray-300 transition-colors cursor-pointer py-3 rounded-lg font-semibold'>Reset</button>
                    <button onClick={handleApply} className='flex-1 bg-blue-600 text-white py-3 cursor-pointer rounded-lg font-semibold'>Apply</button>
                </div>
            </section>
        </div>
    )
}

export default Filter;