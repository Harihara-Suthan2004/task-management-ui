import React, { useState } from 'react'
import CloseIcon from '../assets/images/CloseIcon.png'
import { useProject } from '../Context/ProjectContext'
import {API_URL} from '../Services/ProjectService'
import { useNavigate } from 'react-router-dom'

const ProjectModel = ({ onClose }) => {
    const { allData, loading,refreshData } = useProject();
    const navigate=useNavigate()

    // 1. Manage all form fields in one state object
    const [formData, setFormData] = useState({
        project_id:allData.length+1,
        project_title: "",
        description: "",
        manager: "",
        tasks:[],

    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update state whenever any input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 2. The API Submit Function
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page reload
        setIsSubmitting(true);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {            
                await refreshData();
                alert("Project created successfully!");
                navigate(`/Project/${formData.project_id}`);
                onClose(); 
                navigate(`/Project/${formData.project_id}`);
            } else {
                alert("Failed to create project.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section>
            <div className='flex justify-between h-5 items-center mb-6'>
                <span className='font-semibold text-2xl'>Create New Project</span>
                <img src={CloseIcon} alt="Close" onClick={onClose} className="cursor-pointer" />
            </div>

            <form onSubmit={handleSubmit}>
                {/* Fixed height h-36 removed for better spacing in live forms */}
                <div className='flex flex-col gap-4 mt-5'>
                    <div className='flex flex-col'>
                        <label className='font-medium'>Project Title</label>
                        <input 
                            name="project_title"
                            value={formData.project_title}
                            onChange={handleChange}
                            type="text" 
                            placeholder='Enter Project Name' 
                            required 
                            className='border rounded-md p-1'
                        />
                    </div>
                    
                    <div className='flex flex-col'>
                        <label className='font-medium'>Description</label>
                        <input 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            type="text" 
                            placeholder='Enter Description' 
                            className='border rounded-md p-1'
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label className='font-medium'>Select Manager</label>
                        <select 
                            name="manager"
                            value={formData.manager} 
                            onChange={handleChange} 
                            required
                            className='border rounded-md p-1 bg-white'
                        >
                            <option value="">Select Manager</option>
                            {loading ? (
                                <option>Loading Manager.......</option>
                            ) : (
                                // Filtering  Managers 
                                allData?.map(p => p.manager).map((managerName, index) => (
                                    <option key={index} value={managerName}>
                                        {managerName}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                </div>

                <div className='flex justify-end items-center mt-10 gap-3'>
                    <button 
                        type="button" 
                        className='bg-[#ebe8e8] p-2 rounded-md' 
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className='bg-blue-600 p-2 rounded-md hover:bg-blue-700 cursor-pointer font-medium text-white disabled:bg-blue-300'
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default ProjectModel