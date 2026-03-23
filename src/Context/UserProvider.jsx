import React, { useState, useEffect } from "react";
import { getUsers } from "../Services/UserService";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {

  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login=()=>{
    setIsAuthenticated(true);
  }
  const logout=()=>{
    setIsAuthenticated(false);
  }

  const refreshUsers = async () => {
    try {
      const data = await getUsers();
      setAllUsers(data || []);
    } catch (error) {
      console.log("User fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  return (
    <UserContext.Provider value={{ allUsers, loading,isAuthenticated,logout,login, refreshUsers }}>
      {children}
    </UserContext.Provider>
  );
};