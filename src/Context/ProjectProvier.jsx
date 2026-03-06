import React, { useEffect, useState } from "react";
import { getDashboardData } from "../Services/ProjectService";
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

    return (
        <ProjectContext.Provider value={{ loading, allData, refreshData }}>
            {children}
        </ProjectContext.Provider>
    );
};