import { http } from "../config/http";
const API = process.env.REACT_APP_API;

export const signUp = async (val: any) => {
  try {
    return await http.post(`${API}/`, val);
  } catch (err) {
    return err;
  }
};

export const login = async (val: any) => {
  try {
    return await http.post(`${API}/login`, val);
  } catch (err) {
    return err;
  }
};
