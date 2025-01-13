import axios from "axios";
import { getToken, removeToken } from "./token";
import { useNavigate } from "react-router-dom";

const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 5000
});

request.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

request.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        // 401 Unauthorized, token expired
        removeToken();
        const navigate = useNavigate();
        navigate("/login");
        window.location.reload();
    }
    return Promise.reject(error);
});

export default request;
export { request };