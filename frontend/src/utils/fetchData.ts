import axios from "axios";
import getErrorMessage from "./getErrorMessage";

export const fetchData = async <OutputType>(url: string) => {
  try {
    const res = await axios.get<OutputType[]>(url);
    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const postData = async (url: string, body: any) => {
  try {
    const res = await axios.post(url, body);
    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const patchData = async (url: string, id: number, body: any) => {
  try {
    const res = await axios.patch(`${url}${id}`, body);
    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteData = async (url: string, id: number) => {
  try {
    await axios.delete(`${url}${id}`);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
