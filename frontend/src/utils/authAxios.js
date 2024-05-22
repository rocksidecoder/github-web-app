import axios from "axios";
const authAxios = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("user-info"))}`
  }
});

export default authAxios;
