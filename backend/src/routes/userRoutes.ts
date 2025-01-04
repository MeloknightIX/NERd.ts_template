import express from "express";
import {
  changeUserPassword,
  deleteUser,
  signinUser,
  signupUser,
} from "../controllers/userController";
import requireAuth from "../middleware/requireAuth";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.use(requireAuth);
router.post("/changepw", changeUserPassword);
router.post("/delete", deleteUser);

export default router;
