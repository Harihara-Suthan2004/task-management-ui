// import React, { useEffect, useState } from "react";
// import { API_URL, getDashboardData } from "../Services/ProjectService";
// import { ProjectContext } from "./ProjectContext";

// export const ProjectProvider = ({ children }) => {
//     const [allData, setallData] = useState([]);
//     const [loading, setloading] = useState(true);

//     const refreshData = async () => {
//         try {
//             const data = await getDashboardData();
//             setallData(data || []);
//         } catch (error) {
//             console.log("error", error);
//         } finally {
//             setloading(false);
//         }
//     };

//     useEffect(() => {
//         refreshData();
//     }, []);

//     const addTaskToProject = async (projectId, newTask) => {
//         try {
//             //  Find the current project from local state
//             const targetProject = allData.find(p => String(p.id) === String(projectId));
//             if (!targetProject) return;

//             //  Create updated project object
//             const updatedProject = {
//                 ...targetProject,
//                 tasks: [...targetProject.tasks, newTask]
//             };

//             //  Send PUT request to API
//             const response = await fetch(`${API_URL}/${projectId}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(updatedProject),
//             });

//             if (response.ok) {
//                 //  Update local state so UI refreshes immediately
//                 setallData(prev => prev.map(p =>
//                     String(p.id) === String(projectId) ? updatedProject : p
//                 ));
//             } else {
//                 alert("Failed to save task to server");
//             }
//         } catch (error) {
//             console.log("Add Task Error: ", error);
//         }
//     };

//     const deleteProject = async (id) => {
//         try {
//             const response = await fetch(`${API_URL}/${id}`, {
//                 method: 'DELETE',
//             });
//             if (response.ok) {
//                 setallData((prevdata) => prevdata.filter(project => project.id !== id && project.id !== id));
//             }
//             else {
//                 alert("Failed to delete the data")
//             }
//         }
//         catch (error) {
//             console.log("Delete Error: ", error);
//         }
//     };
//     const updateTask = async (projectId, taskId, updates) => {
//         try {
//             const targetProject = allData.find(p => String(p.id) === String(projectId));
//             if (!targetProject) return;

//             // Create a new project object with the updated task
//             const updatedProject = {
//                 ...targetProject,
//                 tasks: targetProject.tasks.map(task =>
//                     String(task.id) === String(taskId) ? { ...task, ...updates } : task
//                 )
//             };

//             // Send to API
//             const response = await fetch(`${API_URL}/${projectId}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(updatedProject),
//             });

//             if (response.ok) {
//                 // Update local state
//                 setallData(prev => prev.map(p =>
//                     String(p.id) === String(projectId) ? updatedProject : p
//                 ));
//             } else {
//                 alert("Failed to update task on server");
//             }
//         } catch (error) {
//             console.error("Update Task Error:", error);
//         }
//     };
//     return (
//         <ProjectContext.Provider value={{ loading, allData, refreshData, deleteProject, addTaskToProject, updateTask }}>
//             {children}
//         </ProjectContext.Provider>
//     );
// };

import React, { useEffect, useState } from "react";
import { API_URL, getDashboardData } from "../Services/ProjectService";
import { ProjectContext } from "./ProjectContext";

export const ProjectProvider = ({ children }) => {
    const [allData, setallData] = useState([]);
    const [loading, setloading] = useState(true);

    const refreshData = async () => {
        try {
            const data = await getDashboardData();
            // Critical: Ensure every project coming from API has valid arrays
            const sanitizedData = (data || []).map(project => ({
                ...project,
                tasks: Array.isArray(project.tasks) ? project.tasks : [],
                users: Array.isArray(project.users) ? project.users : []
            }));
            setallData(sanitizedData);
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setloading(false);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    const addProject = async (newProjectData) => {
        try {
        
            const formattedProject = {
                ...newProjectData,
                tasks: [],
                users: [] 
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formattedProject),
            });

            if (response.ok) {
                const savedProject = await response.json();
                setallData((prev) => [...prev, savedProject]);
                return savedProject;
            }
        } catch (error) {
            console.error("Add Project Error: ", error);
        }
    };

    const addTaskToProject = async (projectId, newTask) => {
        try {
            const targetProject = allData.find(p => String(p.id) === String(projectId));
            if (!targetProject) return;

            const updatedProject = {
                ...targetProject,
                // Ensure we spread into an array safely
                tasks: [...(Array.isArray(targetProject.tasks) ? targetProject.tasks : []), newTask]
            };

            const response = await fetch(`${API_URL}/${projectId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProject),
            });

            if (response.ok) {
                setallData(prev => prev.map(p =>
                    String(p.id) === String(projectId) ? updatedProject : p
                ));
            }
        } catch (error) {
            console.error("Add Task Error: ", error);
        }
    };

    const deleteProject = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setallData((prev) => prev.filter(p => String(p.id) !== String(id)));
            }
        } catch (error) {
            console.error("Delete Error: ", error);
        }
    };
    const deleteTask = async (projectId, taskId) => {
        try {
            const targetProject = allData.find(p => String(p.id) === String(projectId));
            if (!targetProject) return;

            //  Find the index of the specific task
            const taskIndex = targetProject.tasks.findIndex(t => String(t.id) === String(taskId));

            if (taskIndex === -1) {
                console.error("Task not found in data");
                return;
            }

            // Create a copy of the tasks and remove ONLY that one index
            const updatedTasks = [...targetProject.tasks];
            updatedTasks.splice(taskIndex, 1);

            const updatedProject = { ...targetProject, tasks: updatedTasks };

            const response = await fetch(`${API_URL}/${projectId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProject),
            });

            if (response.ok) {
                setallData(prev => prev.map(p =>
                    String(p.id) === String(projectId) ? updatedProject : p
                ));
            }
        } catch (error) {
            console.error("Delete Task Error:", error);
        }
    };

    const updateTask = async (projectId, taskId, updates) => {
        try {
            const targetProject = allData.find(p => String(p.id) === String(projectId));
            if (!targetProject) return;

            const updatedProject = {
                ...targetProject,
                tasks: (targetProject.tasks || []).map(task =>
                    String(task.id) === String(taskId) ? { ...task, ...updates } : task
                )
            };

            const response = await fetch(`${API_URL}/${projectId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProject),
            });

            if (response.ok) {
                setallData(prev => prev.map(p => String(p.id) === String(projectId) ? updatedProject : p));
            }
        } catch (error) {
            console.error("Update Task Error:", error);
        }
    };

    return (
        <ProjectContext.Provider value={{ loading, allData, refreshData, deleteProject, addProject, addTaskToProject, updateTask, deleteTask }}>
            {children}
        </ProjectContext.Provider>
    );
};