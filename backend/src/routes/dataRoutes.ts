import express, { Request, Response } from "express";
import { status200, status500 } from "../utils/statusResponses";
import { join } from "path";
import { PrismaClient } from "../../node_modules/.prisma/client/index";

const router = express.Router();
const prisma = new PrismaClient();

const path = join(process.cwd(), "src", "data", "data.json");

const getData = async (req: Request, res: Response) => {
  try {
    const data = await prisma.data.findMany();
    return status200(res, data);
  } catch (error) {
    return status500(res, "error retrieving data");
  }
};

const postData = async (req: Request, res: Response) => {
  try {
    const newItem = await prisma.data.create({
      data: req.body,
    });
    return status200(res, newItem);
  } catch (error) {
    return status500(res, "error adding data");
  }
};

const patchData = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.index, 10);
    const updatedItem = await prisma.data.update({
      where: { id },
      data: req.body,
    });
    return status200(res, updatedItem);
  } catch (error) {
    return status500(res, "error updating data");
  }
};

const deleteData = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.data.delete({
      where: { id },
    });
    return status200(res, id);
  } catch (error) {
    return status500(res, "error deleting data");
  }
};

router.get("/", getData);
router.post("/", postData);
router.patch("/:id", patchData);
router.delete("/:id", deleteData);

export default router;
