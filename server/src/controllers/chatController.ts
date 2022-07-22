import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import Chat from "../models/chatModel";
import User from "../models/userModel";
import { Document } from "mongoose";
import { nextTick } from "process";

export const chat = asyncHandler(async (req: any, res: any) => {
  const { userId }: any = req.body;
  console.log("userId", userId);

  if (!userId) {
    console.log("User not there");
    return res.sendStatus(400);
  }

  var isChat: any = await Chat.find({
    isGroupChat: false,
    $and: [
      // {users:{$elemMatch:{$eq.user._id}}}
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name avatar number email",
  });
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.body._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);

      const Chats = await Chat.findOne({
        _id: createdChat._id,
      }).populate("users", "-password");

      res.status(200).json(Chats);
    } catch (error) {
      res.status(400);
      //   console.log("not there");
      console.log(error);
    }
  }
});

export const fetchChat = asyncHandler(async (req: any, res: any) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result: Document<any, any, any>) => {
        result = await User.populate(result, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(result);
      });
  } catch (error) {
    res.status(400);
    console.log(error);
  }
});

export const groupChat = asyncHandler(async (req: any, res: any) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "All feilds are required" });
  }

  let users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res.status(400).send("Minimum 2 users are required ");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
});

export const renameGroup = asyncHandler(async (req: any, res: any) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

export const addToGroup = asyncHandler(async (req: any, res: any) => {
  const { chatId, userId } = req.body;

  //  req from admin or not

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

export const removeFromGroup = asyncHandler(async (req: any, res: any) => {
  const { chatId, userId } = req.body;

  //is a grp admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});
