import axios from "axios";

const liveServer = ""
const localServer = "http://localhost:3000/api"



const axiosConfig = axios.create({
  baseURL: localServer,
  withCredentials: true,
});

export default axiosConfig