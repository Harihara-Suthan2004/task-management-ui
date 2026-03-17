import React, { useEffect, useState } from "react";
import { API_URL, getDashboardData } from "../Services/ProjectService";
import { ProjectContext } from "./ProjectContext";

export const ProjectProvider = ({ children }) => {
    const [allData, setallData] = useState([]);
    const [loading, setloading] = useState(true);

    const refreshData = async () => {
        try {
            const data = await getDashboardData();
            setallData(data || []);
        } catch (error) {
            console.log("error", error);
        } finally {
            setloading(false);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    const addTaskToProject = async (projectId, newTask) => {
        try {
            //  Find the current project from local state
            const targetProject = allData.find(p => String(p.id) === String(projectId));
            if (!targetProject) return;

            //  Create updated project object
            const updatedProject = {
                ...targetProject,
                tasks: [...targetProject.tasks, newTask]
            };

            //  Send PUT request to API
            const response = await fetch(`${API_URL}/${projectId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProject),
            });

            if (response.ok) {
                //  Update local state so UI refreshes immediately
                setallData(prev => prev.map(p =>
                    String(p.id) === String(projectId) ? updatedProject : p
                ));
            } else {
                alert("Failed to save task to server");
            }
        } catch (error) {
            console.log("Add Task Error: ", error);
        }
    };

    const deleteProject = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setallData((prevdata) => prevdata.filter(project => project.id !== id && project.id !== id));
            }
            else {
                alert("Failed to delete the data")
            }
        }
        catch (error) {
            console.log("Delete Error: ", error);
        }
    };
    const updateTask = async (projectId, taskId, updates) => {
        try {
            const targetProject = allData.find(p => String(p.id) === String(projectId));
            if (!targetProject) return;

            // Create a new project object with the updated task
            const updatedProject = {
                ...targetProject,
                tasks: targetProject.tasks.map(task =>
                    String(task.id) === String(taskId) ? { ...task, ...updates } : task
                )
            };

            // Send to API
            const response = await fetch(`${API_URL}/${projectId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProject),
            });

            if (response.ok) {
                // Update local state
                setallData(prev => prev.map(p =>
                    String(p.id) === String(projectId) ? updatedProject : p
                ));
            } else {
                alert("Failed to update task on server");
            }
        } catch (error) {
            console.error("Update Task Error:", error);
        }
    };
    return (
        <ProjectContext.Provider value={{ loading, allData, refreshData, deleteProject, addTaskToProject, updateTask }}>
            {children}
        </ProjectContext.Provider>
    );
};