// import cors from "cors";
import cors from "cors";
import mongoose from "mongoose";

import express, { json } from "express";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
// const dotenv = require("dotenv");
// import { config } from "../server/src/.env";
// import dotenv from ""
// config();

const app = express();

app.use(cors());
app.use(json());

mongoose.connect(process.env.URL, () => {
  console.log("DB connected");
});
app.use("/user", userRouter);

app.listen(8000, () => {
  console.log("server is running");
});
