import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL

// helper function to get token for protected routes
const getAuthHeaders = () =>{
  const token = localStorage.getItem("token");
  return{
    headers:{
      Authorization:`Bearer ${token}`
    }
  };
};

export const getUsers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/users`,getAuthHeaders());
    return res.data;
  } catch (error) {
    console.log("User API error:", error);
    throw error;
  }
};

// Activate a new account via email token
export const activateUser = async(activationData)=>{
  try{
    // activationData will be {token, newPassword}
    const res = await axios.post(`${BASE_URL}/api/users/activate`,activationData);
    return res.data;
  }catch(error){
    console.error("Failed to activate account:",error);
    throw error;
  }
};

// create a new user
export const createUser = async (userData) =>{
  try{
    //user data will be name email role
    const res = await axios.post(`${BASE_URL}/api/users`,userData, getAuthHeaders());
    return res.data;

  }catch(error){
    console.error("Failed to create user:", error);
    throw error;
  }
};