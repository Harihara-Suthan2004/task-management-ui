import axios from "axios";

const API_URL = "https://69a92ef932e2d46caf457735.mockapi.io/users";

export const getUsers = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.log("User API error:", error);
    throw error;
  }
};