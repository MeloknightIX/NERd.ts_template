import express from "express";
import {
  deleteData,
  getData,
  patchData,
  postData,
} from "../controllers/dataController";

const router = express.Router();

router.get("/", getData);
router.post("/", postData);
router.patch("/:id", patchData);
router.delete("/:id", deleteData);

export default router;
