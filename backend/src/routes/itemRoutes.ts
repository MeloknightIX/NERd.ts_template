import express from "express";
import { getItems } from "../controllers/itemController";

const router = express.Router();

router.get("/", getItems);

export default router;
