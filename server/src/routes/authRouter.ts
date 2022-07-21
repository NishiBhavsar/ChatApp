import express from "express";
import { authCtrl, login } from "../controllers/authCtrl";
import { validRegister, validLogin } from "../middleware/validate";
const router = express.Router();

router.post("/", validRegister, authCtrl.register);
router.post("/login", validLogin, login);

export default router;
//
