import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateActiveToken } from "../config/generateToken";
import "dotenv/config";

export const authCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, number, email, password, avatar } = req.body;

      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "Email already exist" });
      }
      //   const pass = password.toString();
      //   const passwordHash = await bcrypt.hash(pass, 10);

      const newUser = {
        name,
        number,
        email,
        password,
        //   : passwordHash,
        avatar,
      };

      //   const active_token = generateActiveToken({ newUser });
      const userData = await Users.create(newUser);

      res.json({
        status: "OK",
        msg: "Register successfully",
        data: newUser,
        // active_token,
        userData,
      });
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      // console.log(errorMessage);
      return res.status(500).json({ msg: errorMessage });
    }
  },
};
export const login = async (req: Request, res: Response) => {
  //   console.log(Users.email);
  try {
    const user = await Users.findOne({
      email: req.body.email,
    });
    // console.log(user.email);
    // console.log(user.password);

    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }
    const secret = process.env.JWT_SECRET || "";
    if (user.password == req.body.password) {
      const token = jwt.sign(JSON.stringify(user), secret);
      console.log("Login successfully");
      return res.status(200).json({ token, user });
    } else {
      return res.status(400).json({ error: "password is incorrect" });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ error: "username or password is must be required" });
  }

  // export const allUsers = async (req:Request, res:Response) => {
  //   const keyword = req.query
  //   console.log(keyword);

  // }

  // console.log("HEyy");
  // const match = await bcrypt.compare(req.body.password, user.password);

  // const secret = process.env.JWT_SECRET || "";

  // const accessToken = jwt.sign(JSON.stringify(user), secret);
  // console.log("I'm there");

  // if (match) {
  //   return res.status(200).json({ accessToken, user });
  // } else {
  //   return res.status(400).json({ error: "password is incorrect" });
  // }
  //   } catch (err) {
  //     return res
  //       .status(400)
  //       .json({ error: "username or password is must be required" });
  //   }
};
// export default authCtrl;
export const allUsers = async (req: Request, res: Response) => {
  const keyword = req.query.search
    ? {
        $or: [
          // i for upper and lowercase
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  // console.log(keyword);
  const users = await Users.find(keyword);
  res.send(users);
};
