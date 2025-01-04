import axios from "axios";
import getErrorMessage from "./getErrorMessage";

export const fetchData = async <OutputType>(url: string, token?: string) => {
  try {
    const res = await axios.get<OutputType[]>(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const postData = async (url: string, body: any, token?: string) => {
  try {
    const res = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const patchData = async (
  url: string,
  id: number,
  body: any,
  token?: string
) => {
  try {
    const res = await axios.patch(`${url}${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteData = async (url: string, id: number, token?: string) => {
  try {
    await axios.delete(`${url}${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
