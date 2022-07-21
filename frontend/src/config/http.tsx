import axios from "axios";
// import "dotenv/config";

const API = process.env.REACT_APP_API;
console.log("API =>", process.env.REACT_APP_API);

export const http = axios.create({
  baseURL: `${API}`,
});
http.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

//  default http;
