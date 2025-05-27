import axios from "axios";

const liveServer = "https://chat-app-v2-0-0.onrender.com/api"
const localServer = "http://localhost:3000/api"



const axiosConfig = axios.create({
  baseURL: liveServer,
  withCredentials: true,
});

export default axiosConfig
