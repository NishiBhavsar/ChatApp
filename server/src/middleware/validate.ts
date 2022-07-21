import { Request, Response, NextFunction } from "express";

export const validRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, number, email, password } = req.body;

  if (!name) {
    return res.status(400).json({ msg: "Please add your name" });
  } else if (name.length > 20) {
    return res.status(400).json({ msg: "Your name is up to 20 chars long" });
  }
  if (!number) {
    return res.status(400).json({ msg: "Please add your phone number" });
  } else if (!validPhone(number)) {
    return res.status(400).json({ msg: "Your phone number is invalid" });
  }

  if (!email) {
    return res.status(400).json({ msg: "Please add your email" });
  } else if (!validateEmail(email)) {
    return res.status(400).json({ msg: "Your email address is not valid" });
  }
  if (password.length < 6) {
    return res.status(400).json({ msg: "Password must be at least 6 chars. " });
  }

  // "^[0-9]{10}$";
  next();
};

export const validLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ msg: "Please add your email" });
  } else if (!validateEmail(email)) {
    return res.status(400).json({ msg: "Your email address is not valid" });
  }
  if (password.length < 6) {
    return res.status(400).json({ msg: "Password must be at least 6 chars. " });
  }
  next();
};

export function validPhone(number: string) {
  const re = /^[0-9]{10}$/;
  return re.test(number);
}
export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
