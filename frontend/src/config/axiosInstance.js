import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${process.env.API_URL}/api/v1`,
    withCredentials: true,
});
