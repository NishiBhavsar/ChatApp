import http from "../../config/http";

export const login = async (val: any) => {
  try {
    return await http.post("user/signin", val);
  } catch (err) {
    return err;
  }
};
export const signUp = async (val: any) => {
  try {
    return await http.post("user/signUp", val);
  } catch (err) {
    return err;
  }
};
