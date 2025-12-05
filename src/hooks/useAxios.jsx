import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

const useAxios = () => {
    return axiosInstance
};

export default useAxios;

// baseURL: 'https://srk-rider-server.vercel.app/'
// baseURL: 'http://localhost:5000/'