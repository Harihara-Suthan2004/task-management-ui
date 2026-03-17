import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject } from '../Context/ProjectContext';
import BackArrowIcon from '../assets/images/BackArrowIcon.png';
import PencilIcon from '../assets/images/PencilIcons.png'
import DownArrowIcon from '../assets/images/DownArrowIcon.png'
import RightArrowIcon from '../assets/images/RightArrowIcon.png'

const TaskDetails = () => {
  const { id, taskId } = useParams();
  const navigate = useNavigate();
  const { allData, updateTask } = useProject();

  const handleFieldChange = (field, value) => {
    updateTask(id, taskId, { [field]: value });
  };

  const project = allData.find(p => String(p.id) === String(id));
  const task = project?.tasks?.find(t => String(t.id) === String(taskId));

  const [isDescOpen, setIsDescOpen] = useState(true);
  const [isInfoOpen, setIsInfoOpen] = useState(true);

  // States to manage custom dropdowns
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [isPriorityMenuOpen, setIsPriorityMenuOpen] = useState(false);

  if (!task) return <div className="p-20 text-center">Task not found.</div>;

  // Status configuration
  const statusOptions = [
    { value: 'to do', label: 'To Do', dot: 'bg-gray-400', bg: 'bg-gray-100', text: 'text-gray-600', hover: 'hover:bg-gray-200' },
    { value: 'progress', label: 'In Progress', dot: 'bg-blue-400', bg: 'bg-blue-50', text: 'text-blue-600', hover: 'hover:bg-blue-100' },
    { value: 'done', label: 'Done', dot: 'bg-green-500', bg: 'bg-green-50', text: 'text-green-600', hover: 'hover:bg-green-100' }
  ];

  // Priority configuration
  const priorityOptions = [
    { value: 'high', label: 'High', dot: 'bg-red-500', bg: 'bg-red-50', text: 'text-red-600', hover: 'hover:bg-red-100' },
    { value: 'medium', label: 'Medium', dot: 'bg-yellow-400', bg: 'bg-yellow-50', text: 'text-yellow-600', hover: 'hover:bg-yellow-100' },
    { value: 'low', label: 'Low', dot: 'bg-blue-400', bg: 'bg-blue-50', text: 'text-blue-600', hover: 'hover:bg-blue-100' }
  ];

  const currentStatus = statusOptions.find(opt => opt.value === task.status?.toLowerCase()) || statusOptions[0];
  const currentPriority = priorityOptions.find(opt => opt.value === task.priority?.toLowerCase()) || priorityOptions[1];

  return (
    <div className="flex flex-col min-h-screen">
      <div className='flex flex-col'>
        <header className="flex relative bottom-7 items-center">
          <img src={BackArrowIcon} className="w-8 h-8 cursor-pointer mr-4" onClick={() => navigate(-1)} alt="back" />
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold">Task</span>
            <span className="text-gray-300 px-1 rounded-b-md font-medium bg-gray-600">{task.id}</span>
          </div>
        </header>

        <div className='w-1/6 mb-3 px-4'>
          <span className='font-semibold text-gray-700 text-xl capitalize'>{task.task_name}</span>
        </div>
      </div>

      <div className="w-full flex flex-col gap-6">
        {/* 1. Description Section */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mx-4">
          <div className="p-4 font-semibold flex gap-2 items-center border-b border-gray-100 cursor-pointer" onClick={() => setIsDescOpen(!isDescOpen)}>
            <img src={isDescOpen ? DownArrowIcon : RightArrowIcon} alt="arrow" className="w-4 h-4" />
            Description
            <button className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full p-1 ml-2">
              <img src={PencilIcon} alt="edit" />
            </button>
          </div>
          {isDescOpen && (
            <div className="p-6 text-gray-600 leading-relaxed border-t border-gray-50">
              {task.description || "No description provided."}
            </div>
          )}
        </section>

        {/* 2. Task Information Section */}
        <div className='mx-4'>
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 relative z-20">
            <div className="p-4 font-semibold flex gap-2 items-center border-b border-gray-100 cursor-pointer" onClick={() => setIsInfoOpen(!isInfoOpen)}>
              <img src={isInfoOpen ? DownArrowIcon : RightArrowIcon} alt="arrow" className="w-4 h-4" />
              Task Information
            </div>

            {isInfoOpen && (
              <div className="p-6 grid grid-cols-3 gap-y-8 border-t border-gray-50">

                {/* --- CUSTOM STATUS DROPDOWN --- */}
                <div className="relative z-50">
                  <p className="text-gray-400 text-xs font-bold uppercase mb-2">Status</p>
                  <div className="relative inline-block">
                    <div
                      onClick={() => { setIsStatusMenuOpen(!isStatusMenuOpen); setIsPriorityMenuOpen(false); }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 cursor-pointer transition-all ${currentStatus.bg} ${currentStatus.text}`}
                    >
                      <span className={`w-3 h-3 rounded-full ${currentStatus.dot}`}></span>
                      <span className="font-semibold text-sm capitalize">{currentStatus.label}</span>
                      <img src={DownArrowIcon} className={`w-3 h-3 ml-2 opacity-50 transition-transform ${isStatusMenuOpen ? 'rotate-180' : ''}`} alt="chevron" />
                    </div>

                    {isStatusMenuOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsStatusMenuOpen(false)}></div>
                        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 py-1">
                          {statusOptions.map((opt) => (
                            <div
                              key={opt.value}
                              onClick={() => {
                                handleFieldChange('status', opt.value);
                                setIsStatusMenuOpen(false);
                              }}
                              className={`px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${opt.hover}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`w-3 h-3 rounded-full ${opt.dot}`}></span>
                                <span className="font-semibold text-sm text-gray-700 capitalize">{opt.label}</span>
                              </div>
                              {task.status?.toLowerCase() === opt.value && <span className="text-blue-500 font-bold">✓</span>}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* --- CUSTOM PRIORITY DROPDOWN --- */}
                <div className="relative z-40">
                  <p className="text-gray-400 text-xs font-bold uppercase mb-2">Priority</p>
                  <div className="relative inline-block">
                    <div
                      onClick={() => { setIsPriorityMenuOpen(!isPriorityMenuOpen); setIsStatusMenuOpen(false); }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 cursor-pointer transition-all ${currentPriority.bg} ${currentPriority.text}`}
                    >
                      <span className={`w-3 h-3 rounded-full ${currentPriority.dot}`}></span>
                      <span className="font-semibold text-sm capitalize">{currentPriority.label}</span>
                      <img src={DownArrowIcon} className={`w-3 h-3 ml-2 opacity-50 transition-transform ${isPriorityMenuOpen ? 'rotate-180' : ''}`} alt="chevron" />
                    </div>

                    {isPriorityMenuOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsPriorityMenuOpen(false)}></div>
                        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 py-1">
                          {priorityOptions.map((opt) => (
                            <div
                              key={opt.value}
                              onClick={() => {
                                handleFieldChange('priority', opt.value);
                                setIsPriorityMenuOpen(false);
                              }}
                              className={`px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${opt.hover}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`w-3 h-3 rounded-full ${opt.dot}`}></span>
                                <span className="font-semibold text-sm text-gray-700 capitalize">{opt.label}</span>
                              </div>
                              {task.priority?.toLowerCase() === opt.value && <span className="text-blue-500 font-bold">✓</span>}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* --- DUE DATE --- */}
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase mb-2">Due Date</p>
                  <input
                    type="date"
                    value={task.due_date || ""}
                    onChange={(e) => handleFieldChange('due_date', e.target.value)}
                    className="bg-transparent border border-transparent hover:border-gray-200 rounded px-2 py-1 font-medium text-gray-700 outline-none cursor-pointer"
                  />
                </div>

                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase mb-2">Assigned To</p>
                  <span className="font-medium text-gray-700 px-2">User {task.user_id}</span>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase mb-2">Created At</p>
                  <span className="font-medium text-gray-700 px-2">{task.created_at || 'Recently'}</span>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* 3. Tabs Section */}
        <div className='pb-6 mx-4'>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-4">
            <div className="flex border-b border-gray-100">
              <button className="px-6 py-3 border-b-2 border-blue-600 text-blue-600 font-semibold text-sm">Comments (1)</button>
              <button className="px-6 py-3 text-gray-400 font-semibold text-sm hover:text-gray-600">Activity Log (4)</button>
              <button className="px-6 py-3 text-gray-400 font-semibold text-sm hover:text-gray-600">Documents</button>
            </div>
            <div className="p-6">
              <textarea placeholder="Add a comment..." className="w-full border border-gray-200 rounded-lg p-4 focus:outline-blue-500 resize-none h-32" />
              <div className="mt-8 border-t pt-6">
                <p className="font-bold text-sm text-gray-700">Commenter: {project.manager || "Admin"}</p>
                <p className="text-gray-600 mt-1">please do complete in today</p>
                <div className="mt-4 w-16 h-16 bg-blue-600 flex items-center justify-center rounded-lg text-white font-bold text-xs">doc</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;