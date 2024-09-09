import { Request, Response } from "express";
import { readFile } from "fs";
import { join } from "path";

const path = join(process.cwd(), "src", "data", "items.json");

const getItems = async (req: Request, res: Response) => {
  try {
    readFile(path, "utf8", (error, data) => {
      if (error) return res.status(404).json({ error: "file not found" });
      try {
        res.status(200).json(JSON.parse(data));
      } catch (error) {
        res.status(500).json({ error: "error reading file" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

export { getItems };
