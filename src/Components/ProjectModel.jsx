// import React, { useState } from 'react'
// import CloseIcon from '../assets/images/CloseIcon.png'
// import { useProject } from '../Context/ProjectContext'
// import {API_URL} from '../Services/ProjectService'
// import { useNavigate } from 'react-router-dom'

// const ProjectModel = ({ onClose }) => {
//     const { allData, loading,refreshData } = useProject();
//     const navigate=useNavigate()

//     // 1. Manage all form fields in one state object
//     const [formData, setFormData] = useState({
//         id:allData.length+1,
//         project_title: "",
//         description: "",
//         manager: "",
//         tasks:[],

//     });
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // Update state whenever any input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     // 2. The API Submit Function
//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Prevents page reload
//         setIsSubmitting(true);

//         try {
//             const response = await fetch(API_URL, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (response.ok) {            
//                 await refreshData();
//                 alert("Project created successfully!");
//                 navigate(`/Project/${formData.id}`);
//                 onClose(); 
//                 navigate(`/Project/${formData.id}`);
//             } else {
//                 alert("Failed to create project.");
//             }
//         } catch (error) {
//             console.error("Error submitting form:", error);
//             alert("An error occurred. Please try again.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <section>
//             <div className='flex justify-between h-5 items-center mb-6'>
//                 <span className='font-semibold text-2xl text-gray-600'>Create New Project</span>
//                 <img src={CloseIcon} alt="Close" onClick={onClose} className="cursor-pointer" />
//             </div>

//             <form onSubmit={handleSubmit}>
//                 {/* Fixed height h-36 removed for better spacing in live forms */}
//                 <div className='flex flex-col gap-4 mt-5'>
//                     <div className='flex flex-col'>
//                         <label className='font-medium text-gray-600'>Project Title</label>
//                         <input 
//                             name="project_title"
//                             value={formData.project_title}
//                             onChange={handleChange}
//                             type="text" 
//                             placeholder='Enter Project Name' 
//                             required 
//                             className='border rounded-md p-1'
//                         />
//                     </div>
                    
//                     <div className='flex flex-col'>
//                         <label className='font-medium text-gray-600'>Description</label>
//                         <input 
//                             name="description"
//                             value={formData.description}
//                             onChange={handleChange}
//                             type="text" 
//                             placeholder='Enter Description' 
//                             className='border rounded-md p-1'
//                         />
//                     </div>

//                     <div className='flex flex-col'>
//                         <label className='font-medium text-gray-600'>Select Manager</label>
//                         <select 
//                             name="manager"
//                             value={formData.manager} 
//                             onChange={handleChange} 
//                             required
//                             className='border rounded-md p-1 bg-white'
//                         >
//                             <option className='text-gray-600' value="">Select Manager</option>
//                             {loading ? (
//                                 <option>Loading Manager.......</option>
//                             ) : (
//                                 // Filtering  Managers 
//                                 allData?.map(p => p.manager).map((managerName, index) => (
//                                     <option key={index} value={managerName}>
//                                         {managerName}
//                                     </option>
//                                 ))
//                             )}
//                         </select>
//                     </div>
//                 </div>

//                 <div className='flex justify-end items-center mt-10 gap-3'>
//                     <button 
//                         type="button" 
//                         className='bg-[#ebe8e8] p-2 rounded-md' 
//                         onClick={onClose}
//                     >
//                         Cancel
//                     </button>
//                     <button 
//                         type="submit" 
//                         disabled={isSubmitting}
//                         className='bg-blue-600 p-2 rounded-md hover:bg-blue-700 cursor-pointer font-medium text-white disabled:bg-blue-300'
//                     >
//                         {isSubmitting ? "Submitting..." : "Submit"}
//                     </button>
//                 </div>
//             </form>
//         </section>
//     )
// }

// export default ProjectModel

import React, { useState } from 'react'
import { useProject } from '../Context/ProjectContext'
import { API_URL } from '../Services/ProjectService'
import { useNavigate } from 'react-router-dom'

const ProjectModel = ({ onClose }) => {
    const { allData, loading, refreshData } = useProject();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        id: allData.length + 1,
        project_title: "",
        description: "",
        manager: "",
        tasks: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                await refreshData();
                onClose();
                navigate(`/Project/${formData.id}`);
            } else {
                alert("Failed to create project.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        
        
        <section className="bg-white">
            {/* Header */}
            <div className='flex justify-between items-center mb-6'>
                <span className='font-bold text-[22px] text-[#2D3748]'>Create New Project</span>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">
                    &times;
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-5'>
                    {/* Project Title */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-[15px] font-semibold text-[#4A5568]'>
                            Project Title <span className="text-gray-500 font-normal">*</span>
                        </label>
                        <input
                            name="project_title"
                            value={formData.project_title}
                            onChange={handleChange}
                            type="text"
                            required
                            className='border border-[#CBD5E0] rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition-colors'
                        />
                    </div>

                    {/* Description */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-[15px] font-semibold text-[#4A5568]'>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className='border border-[#CBD5E0] rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition-colors resize-none'
                        />
                    </div>

                    {/* Manager Selection */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-[15px] font-semibold text-[#4A5568]'>
                            Project Manager <span className="text-gray-500 font-normal">*</span>
                        </label>
                        <div className="relative">
                            <select
                                name="manager"
                                value={formData.manager}
                                onChange={handleChange}
                                required
                                className='w-full border border-[#CBD5E0] rounded-lg px-3 py-2 bg-white appearance-none outline-none focus:border-blue-500 text-[#4A5568]'
                            >
                                <option value="">Select a manager</option>
                                {loading ? (
                                    <option>Loading Managers...</option>
                                ) : (
                                    [...new Set(allData?.map(p => p.manager))].map((managerName, index) => (
                                        <option key={index} value={managerName}>
                                            {managerName}
                                        </option>
                                    ))
                                )}
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className='flex justify-end items-center mt-8 gap-3'>
                    <button
                        type="button"
                        onClick={onClose}
                        className='px-6 py-2.5 rounded-lg bg-[#E2E8F0] text-[#4A5568] font-semibold hover:bg-[#CBD5E0] transition-colors'
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className='px-6 py-2.5 rounded-lg bg-[#3182CE] text-white font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300'
                    >
                        {isSubmitting ? "Creating..." : "Create Project"}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default ProjectModel