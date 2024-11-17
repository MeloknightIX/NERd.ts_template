import { useState } from "react";
import axios from "axios";

export const useGET = <DataType>(url: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get<DataType[]>(url);
      setData(res.data);
    } catch (err) {
      setError(`Failed GET: ${(err as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, data, error, getData };
};

export const usePOST = <DataType>(url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async (body: DataType) => {
    setIsLoading(true);
    try {
      await axios.post(url, body, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      setError(`Failed POST: ${(err as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, postData };
};

export const usePATCH = <DataType>(url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const patchData = async (id: number, body: DataType) => {
    setIsLoading(true);
    try {
      await axios.patch(`${url}${id}`, body);
    } catch (err) {
      setError(`Failed PATCH: ${(err as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, patchData };
};

export const useDELETE = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteData = async (id: number) => {
    setIsLoading(true);
    try {
      await axios.delete(`${url}${id}`);
    } catch (err) {
      setError(`Failed DELETE: ${(err as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, deleteData };
};
