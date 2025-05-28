import axios from "axios";

//const api = "https://chat-app-v2-0-0.onrender.com/api"
const api = "http://localhost:3000/api"



const axiosConfig = axios.create({
  baseURL: api,
  withCredentials: true,
});

export default axiosConfig
