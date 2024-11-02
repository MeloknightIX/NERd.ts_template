import express, { Request, Response } from "express";
import { readFile, writeFile } from "fs";
import { status200, status404, status500 } from "../utils/statusResponses";
import { join } from "path";

const router = express.Router();

const path = join(process.cwd(), "src", "data", "items.json");

const getData = async (req: Request, res: Response) => {
  try {
    readFile(path, "utf8", (error, data) => {
      if (error) return status404(res, "file not found");
      try {
        status200(res, JSON.parse(data));
      } catch (error) {
        status500(res, "error reading file");
      }
    });
  } catch (error) {
    status500(res, "server error");
  }
};
router.get("/", getData);

const postData = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    writeFile(path, JSON.stringify(data, null, 2), (error) => {
      if (error) return status500(res, "error writing file");
      status200(res, data);
    });
  } catch (error) {
    status500(res, "server error");
  }
};
router.post("/", postData);

export default router;
