import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:1960/api"
})

export default api