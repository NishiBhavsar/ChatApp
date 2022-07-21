import express from "express";
import { authCtrl, login, allUsers } from "../controllers/authCtrl";
import { chat } from "../controllers/chatController";
import { validRegister, validLogin } from "../middleware/validate";
const router = express.Router();

router.post("/", validRegister, authCtrl.register);
router.post("/login", validLogin, login);
router.get("/", allUsers);
router.post("/chat", chat);

export default router;
//
