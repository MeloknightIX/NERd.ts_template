import fs from "fs/promises";

export const readFile = async (dataPath: string) => {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data:", error);
    throw new Error("Could not read data");
  }
};
export const writeFile = async (dataPath: string, data: any) => {
  try {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing data:", error);
    throw new Error("Could not write data");
  }
};
