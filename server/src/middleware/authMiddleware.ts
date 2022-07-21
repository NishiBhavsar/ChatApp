//for login user
// import jwt from "jsonwebtoken";
// import userModel from "../models/userModel";
// import { Request, Response, NextFunction } from "express";
// import "dotenv/config";
// import asyncHandler from "express-async-handler";
// const protect = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const secret =  process.env.JWT_SECRET|| ""
//       //decodes token id
//       const decoded = jwt.verify(token, secret);

//       req.user = await userModel.findById(decoded.id).select("-password");

//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error("Not authorized, token failed");
//     }
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });

// module.exports = { protect };
