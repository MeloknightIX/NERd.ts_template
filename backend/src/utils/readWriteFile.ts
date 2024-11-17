import { readFile, writeFile } from "fs/promises";

export const readData = async (dataPath: string) => {
  try {
    const data = await readFile(dataPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data:", error);
    throw new Error("Could not read data");
  }
};
export const writeData = async (dataPath: string, data: any) => {
  try {
    await writeFile(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing data:", error);
    throw new Error("Could not write data");
  }
};
