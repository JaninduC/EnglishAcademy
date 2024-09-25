import axios from "axios";

const api = axios.create({
    baseURL: "https://general-english-24-server-production.up.railway.app/admin",
  });
  
  export default api;