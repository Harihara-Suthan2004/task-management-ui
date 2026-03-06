import { createContext,useContext } from "react";

export const ProjectContext=createContext();

export const useProject=()=>{
    const context=useContext(ProjectContext);
    if(!context){
        throw new Error("useProjects need to be used within a ProjectProvider");
    }
    return context;
};