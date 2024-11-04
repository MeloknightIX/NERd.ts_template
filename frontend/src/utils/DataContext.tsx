import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type DataType = {
  key: string;
  value: string;
};

type DataContextType = {
  data: DataType[];
  isLoading: boolean;
  error: null | string;
  postData: (newData: DataType) => Promise<void>;
  isOffline: boolean;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

type DataProviderProps = {
  children: ReactNode | ReactNode[];
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get<DataType[]>("api/data/");
        setData(res.data);
      } catch (error) {
        const errorMessage = "failed fetching data";
        setError(errorMessage);
        console.error(errorMessage, error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
    };
    const handleOffline = () => {
      setIsOffline(true);
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const postData = async (newData: DataType) => {
    const prevData = data;
    try {
      // update DB
      await axios.post("api/data/", [...prevData, newData], {
        headers: { "Content-Type": "application/json" },
      });
      // update context
      setData([...prevData, newData]);
    } catch (error) {
      console.error("failed to update: you must be online");
    }
  };

  return (
    <DataContext.Provider
      value={{ data, isLoading, error, postData, isOffline }}
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
