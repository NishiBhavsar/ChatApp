import express from "express";

import dotenv from "dotenv";
import connectDB from "../config/db";
import { chats } from "../data/data";
import { Request } from "express";
import { Response } from "express";

dotenv.config();
connectDB();
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  // console.log(req.params.id);
  const singleChat = chats.find((data) => data._id === req.params.id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log("server started on PORT", PORT);
});
