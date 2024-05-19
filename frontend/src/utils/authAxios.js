import axios from "axios";
const authAxios = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("user-info"))}`
  }
});

export default authAxios;
