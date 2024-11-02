import { Response } from "express";

const status200 = (res: Response, data: any) => {
  return res.status(200).json(data);
};
const status201 = (res: Response, message: string) => {
  return res.status(201).json({ message });
};
const status404 = (res: Response, error: string) => {
  return res.status(404).json({ error });
};
const status500 = (res: Response, error: string) => {
  return res.status(500).json({ error });
};

export { status200, status201, status404, status500 };
