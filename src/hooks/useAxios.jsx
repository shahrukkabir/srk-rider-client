import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://srk-rider-server.vercel.app/'
})

const useAxios = () => {
    return axiosInstance
};

export default useAxios;