import React, { useState } from 'react';
import { useProject } from '../Context/ProjectContext';

const TaskModel = ({ onClose, projectData }) => {
  const { addTaskToProject } = useProject();

  // State to capture form inputs
  const [formData, setFormData] = useState({
    task_name: '',
    description: '',
    status: 'To Do',
    priority: 'Low',
    due_date: '',
    user_id: ''
  });

  const projectUser = Array.isArray(projectData?.users) ? projectData.users : [];
  const projectManager = projectData?.manager;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    if (!formData.task_name || !formData.user_id) {
      alert("Please fill in the Title and Assigned To fields.");
      return;
    }

    const newTask = {
      id: `t${String(Date.now()).slice(0,3)}`, // Simple unique ID
      user_id: formData.user_id,
      task_name: formData.task_name,
      description: formData.description,
      priority: formData.priority.toLowerCase(),
      status: formData.status.toLowerCase(),
      assigned_by: projectManager || "Manager",
      due_date: formData.due_date
    };

    await addTaskToProject(projectData.id, newTask);
    onClose(); // Close the modal
  };

  return (
    <div className='flex flex-col gap-4'>
      <section className='flex flex-col gap-3'>
        <div className='flex flex-col'>
          <label className='text-gray-600 font-medium'>Title</label>
          <input 
            name="task_name"
            value={formData.task_name}
            onChange={handleChange}
            type="text" placeholder='Enter task title' className='border border-gray-200 p-2 rounded-md' 
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-gray-600 font-medium'>Description</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            className='border border-gray-200 p-2 rounded-md' 
          />
        </div>
      </section>

      <section className='grid grid-cols-2 gap-7'>
        <div className='flex flex-col'>
          <label className='text-gray-600 font-medium'>Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className='border border-gray-200 rounded-md p-2'>
            <option value="To Do">to do</option>
            <option value="Done">done</option>
            <option value="Progress">progress</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label className='text-gray-600 font-medium'>Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange} className='border border-gray-200 rounded-md p-2'>
            <option value="Low">Low</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label className='text-gray-600 font-medium'>Due Date</label>
          <input name="due_date" type="Date" value={formData.due_date} onChange={handleChange} className='border border-gray-200 rounded-md p-2' />
        </div>
        <div className='flex flex-col'>
          <label className='text-gray-600 font-medium'>Assigned To</label>
          <select name="user_id" value={formData.user_id} onChange={handleChange} className='border border-gray-200 rounded-md p-2'>
            <option value="">Select a member</option>
            {projectManager && <option value={projectManager}>{projectManager} (Manager)</option>}
            {projectUser.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="" className='text-gray-600 font-medium'>attachment</label>
          <input type="file" className='border border-gray-200 rounded-md p-2'/>
        </div>
      </section>

      <div className='flex justify-end gap-3.5 items-center mt-4'>
        <button onClick={onClose} className='bg-gray-300 hover:bg-gray-400 rounded-md px-4 py-2'>Cancel</button>
        <button onClick={handleCreate} className='bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-4 py-2'>
          Create Task
        </button>
      </div>
    </div>
  );
};

export default TaskModel;