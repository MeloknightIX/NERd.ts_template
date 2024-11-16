import express, { Request, Response } from "express";

const router = express.Router();

const getData = async (req: Request, res: Response) => {};

const postData = async (req: Request, res: Response) => {};

const patchData = async (req: Request, res: Response) => {};

const deleteData = async (req: Request, res: Response) => {};

router.get("/", getData);
router.post("/", postData);
router.patch("/:id", patchData);
router.delete("/:id", deleteData);

export default router;
