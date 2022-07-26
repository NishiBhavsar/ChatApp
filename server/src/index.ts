import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { route } from "./routes/index";
import socket from "socket.io";
// import {notFound} from "./middleware/errorMiddleware";

require("dotenv/config");
//Database
import "./config/db";

//Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

//Routes
app.use("/api", route.authRouter);
app.use("/api", route.chatRouter);

//server listening

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
