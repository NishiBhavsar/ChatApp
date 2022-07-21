import axios from "axios";

const API = process.env.reactAPI;
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
