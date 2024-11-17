import express, { Request, Response } from "express";
import { promises as fs } from "fs";
import { join } from "path";
import { readData, writeData } from "../utils/readWriteFile";

const router = express.Router();
const dataPath = join(process.cwd(), "data", "data.json");

const getData = async (req: Request, res: Response) => {
  try {
    const data = await readData(dataPath);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
const postData = async (req: Request, res: Response) => {
  try {
    const newData = req.body;
    if (!newData.name || !newData.value) {
      res.status(400).json({ error: "invalid data format" });
      return;
    }

    const data = await readData(dataPath);
    const id = data.length ? data[data.length - 1].id + 1 : 1;
    const newEntry = { id, ...newData };
    data.push(newEntry);

    await writeData(dataPath, data);
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
const patchData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const data = await readData(dataPath);
    const index = data.findIndex((item: any) => item.id === parseInt(id));

    if (index === -1) {
      res.status(404).json({ error: "item not found" });
      return;
    }

    data[index] = { ...data[index], ...updatedData };
    await writeData(dataPath, data);

    res.json(data[index]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
const deleteData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await readData(dataPath);
    const newData = data.filter((item: any) => item.id !== parseInt(id));

    if (newData.length === data.length) {
      res.status(404).json({ error: "item not found" });
      return;
    }

    await writeData(dataPath, newData);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

router.get("/", getData);
router.post("/", postData);
router.patch("/:id", patchData);
router.delete("/:id", deleteData);

export default router;
