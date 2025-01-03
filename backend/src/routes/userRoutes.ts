import express from "express";
import {
  changeUserPassword,
  signinUser,
  signupUser,
} from "../controllers/userController";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/changepw", changeUserPassword);

export default router;
