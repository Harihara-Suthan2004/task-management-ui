import axios from "axios";

const API_URL = "https://69a720a32cd1d055268ff452.mockapi.io/tm_project";

export const getUsers = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.log("User API error:", error);
    throw error;
  }
};