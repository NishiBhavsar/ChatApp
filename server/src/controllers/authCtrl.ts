import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../config/generateToken";
import "dotenv/config";

export const authCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, number, email, password, avatar } = req.body;

      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "Email already exist" });
      }
      const pass = password.toString();
      const passwordHash = await bcrypt.hash(pass, 10);

      const newUser = {
        name,
        number,
        email,
        password: passwordHash,
        avatar,
      };

      const active_token = generateToken(newUser);
      // generateActiveToken({ newUser });
      const userData = await Users.create(newUser);

      res.json({
        status: "OK",
        msg: "Register successfully",
        data: newUser,
        active_token,
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
export const login = async (req: any, res: Response) => {
  // const active_token = generateActiveToken({ newUser });
  //     const userData = await Users.create(newUser);
  const user = await Users.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.status(401).json({ error: "user not found" });
  }
  bcrypt.compare(req.body.password, user.password, (err, data) => {
    if (data) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        avatar: user.avatar,
        active_token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ msg: "invalid auth" });
    }
  });
};

// export default authCtrl;
export const allUsers = async (req: Request, res: Response) => {
  const keyword = req.query.search
    ? {
        $or: [
          // i for upper and lowercase
          { name: { $regex: req.query.search, $options: "i" } },
          // { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  // console.log(keyword);
  const users = await Users.find(keyword).find({ _id: { $ne: req.body._id } });
  res.send(users);
};
