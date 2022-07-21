import { http } from "../config/http";

export const signUp = async (val: any) => {
  try {
    return await http.post("api/", val);
  } catch (err) {
    return err;
  }
};

export const login = async (val: any) => {
  try {
    return await http.post("api/login", val);
  } catch (err) {
    return err;
  }
};
