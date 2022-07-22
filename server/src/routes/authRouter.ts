import express from "express";
import { authCtrl, login, allUsers } from "../controllers/authCtrl";
import {
  chat,
  fetchChat,
  groupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} from "../controllers/chatController";
import { allMessages, sendMessage } from "../controllers/messageCtrl";
import { validRegister, validLogin } from "../middleware/validate";
import { protect } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/", validRegister, authCtrl.register);
router.post("/login", validLogin, login);
router.get("/", protect, allUsers);

//chat routes

router.post("/chat", protect, chat);
router.get("/chat", protect, fetchChat);
router.post("/group", protect, groupChat);
router.put("/groupname", protect, renameGroup);
router.put("/addtogroup", protect, addToGroup);
router.put("/groupremove", protect, removeFromGroup);

//message routes

router.post("/message", protect, sendMessage);
router.get("/:chatId", protect, allMessages);

export default router;
//
