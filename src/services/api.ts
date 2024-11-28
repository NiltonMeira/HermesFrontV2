import axios from "axios";

const api = axios.create({
    baseURL: "https://hermesbackend.onrender.com/api/"
})

export default api