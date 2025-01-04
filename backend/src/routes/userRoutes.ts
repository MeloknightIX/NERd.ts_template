import express from "express";
import {
  changeUserPassword,
  deleteUser,
  signinUser,
  signupUser,
} from "../controllers/userController";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/changepw", changeUserPassword);
router.post("/delete", deleteUser);

export default router;
