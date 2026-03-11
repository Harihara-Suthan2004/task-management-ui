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

    const deleteProject=async (id)=>{
        try{
            const response=await fetch(`${API_URL}/${id}`,{
                method:'DELETE',
            });
            if(response.ok){
                setallData((prevdata)=>prevdata.filter(project=>project.id !== id && project.id!==id));
            }
            else{
                alert("Failed to delete the data")
            }
        }
        catch(error){
            console.log("Delete Error: ",error);
        }
    };
    
    return (
        <ProjectContext.Provider value={{ loading, allData, refreshData,deleteProject }}>
            {children}
        </ProjectContext.Provider>
    );
};