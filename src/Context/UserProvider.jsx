//  Fix - wrap refreshUsers in useCallback
import React, { useState, useEffect, useCallback } from "react";
import { getUsers } from "../Services/UserService";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(()=>{
    const token = localStorage.getItem('token');
    return token ? true : false
  });

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const refreshUsers = useCallback(async () => {
    //check if the token exist in localstorage
    const token = localStorage.getItem('token');
    if(!token){
      //cancel api call
      setLoading(false);
      return;
    }
    try {
      const data = await getUsers();
      setAllUsers(data || []);
    } catch (error) {
      console.log("User fetch error", error);
    } finally {
      setLoading(false);
    }
  }, []); //  empty deps = stable function, no infinite loop

  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  return (
    <UserContext.Provider value={{ allUsers, loading, isAuthenticated, logout, login, refreshUsers }}>
      {children}
    </UserContext.Provider>
  );
};