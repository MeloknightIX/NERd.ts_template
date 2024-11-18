import axios from "axios";

export const fetchData = async <DataType>(url: string) => {
  const res = await axios.get<DataType[]>(url);
  return res.data;
};

export const postData = async <DataType>(url: string, newData: DataType) => {
  const res = await axios.post(url, newData);
  return res.data;
};

export const patchData = async <DataType>(
  url: string,
  id: number,
  newData: DataType
) => {
  const res = await axios.patch(`${url}${id}`, newData);
  return res.data;
};

export const deleteData = async (url: string, id: number) => {
  await axios.delete(`${url}${id}`);
};
