import express from "express";
import {
  deleteData,
  getData,
  patchData,
  postData,
} from "../controllers/dataController";
import requireAuth from "../middleware/requireAuth";

const router = express.Router();

router.get("/", getData);
router.use(requireAuth);
router.post("/", postData);
router.patch("/:id", patchData);
router.delete("/:id", deleteData);

export default router;
