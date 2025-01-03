import { join } from "path";
import { readFile, writeFile } from "../utils/readWriteFile";
import { Request, Response } from "express";
import getErrorMessage from "../utils/getErrorMessage";

const dataPath = join(process.cwd(), "data", "data.json");

const getData = async (req: Request, res: Response) => {
  try {
    const data = await readFile(dataPath);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};
const postData = async (req: Request, res: Response) => {
  try {
    const newData = req.body;
    if (!newData.name || !newData.value) {
      res.status(400).json({ error: "invalid data format" });
      return;
    }

    const data = await readFile(dataPath);
    const id = data.length ? data[data.length - 1].id + 1 : 1;
    const newEntry = { id, ...newData };
    data.push(newEntry);

    await writeFile(dataPath, data);
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};
const patchData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const data = await readFile(dataPath);
    const index = data.findIndex((item: any) => item.id === parseInt(id));

    if (index === -1) {
      res.status(404).json({ error: "item not found" });
      return;
    }

    data[index] = { ...data[index], ...updatedData };
    await writeFile(dataPath, data);

    res.json(data[index]);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};
const deleteData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await readFile(dataPath);
    const newData = data.filter((item: any) => item.id !== parseInt(id));

    if (newData.length === data.length) {
      res.status(404).json({ error: "item not found" });
      return;
    }

    await writeFile(dataPath, newData);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};
export { getData, postData, patchData, deleteData };
