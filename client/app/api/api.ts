import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.1.6:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 15000,
});

export default api;
