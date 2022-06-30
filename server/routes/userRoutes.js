import mongoose from "mongoose";
import { Router } from "express";
import User from "../models/userModels.js";
import jwt from "jsonwebtoken";

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  //   res.json(req.body);
  try {
    console.log(req.body);
    const findUser = await User.findOne({
      email: req.body.email,
    });
    if (!findUser) {
      const user = await User.create(req.body);
      return res.status(201).json(user);
    }
    return res.status(400).json({
      error: "This Email is Already exist Signup with different email id ",
    });
  } catch (err) {
    return err;
  }
});

userRouter.post("/signin", async (req, res) => {
  const test = true;
  try {
    // console.log(req.body);
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(400).json({
        error: "This Mail does Not exist please Register First",
      });
    }
    if (user.password === req.body.password && user.email === req.body.email) {
      const token = jwt.sign(JSON.stringify(user), process.env.SECRATEKEY);
      return res.status(200).json({ user, token });
    } else {
      return res.status(400).json({
        error: "Please enter valid password",
      });
    }
    // return res.status(400).json({
    //   error: "Please enter valid email id and password ",
    // });
  } catch (err) {
    console.log("error", err);
    return err;
  }
});
// export default userRouter;
export default userRouter;
