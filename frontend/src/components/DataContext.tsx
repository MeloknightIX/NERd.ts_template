import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useIsOffline from "../utils/useIsOffline";

export type DataType = {
  id?: number;
  key: string;
  value: string;
};

type DataContextType = {
  data: DataType[];
  isLoading: boolean;
  error: null | string;
  isOffline: boolean;
  postData: (newData: DataType) => Promise<void>;
  deleteData: (index: number) => Promise<void>;
  patchData: (index: number, newData: DataType) => Promise<void>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

type DataProviderProps = {
  children: ReactNode | ReactNode[];
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  const { isOffline } = useIsOffline();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get<DataType[]>("api/data/");
      setData(res.data);
    } catch (error) {
      setError("failed fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const postData = async (newData: DataType) => {
    try {
      await axios.post("api/data/", newData, {
        headers: { "Content-Type": "application/json" },
      });
      getData();
    } catch (error) {
      console.error("failed to add: you must be online");
    }
  };

  const deleteData = async (id: number) => {
    try {
      await axios.delete("api/data/" + id);
      getData();
    } catch (error) {
      console.error("failed to delete: you must be online");
    }
  };

  const patchData = async (id: number, newData: DataType) => {
    try {
      await axios.patch("api/data/" + id, newData);
      getData();
    } catch (error) {
      console.error("failed to update: you must be online");
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        isLoading,
        error,
        postData,
        deleteData,
        patchData,
        isOffline,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context)
    throw new Error("useDataContext must be used within a DataProvider");
  return context;
};
