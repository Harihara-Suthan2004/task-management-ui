import axios from 'axios';

export const API_URL = "https://69a720a32cd1d055268ff452.mockapi.io/tm_project";

export const getDashboardData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("API Service Error:", error);
        throw error; 
    }
};