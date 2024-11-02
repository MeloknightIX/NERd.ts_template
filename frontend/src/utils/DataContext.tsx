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
};

const DataContext = createContext<DataContextType | undefined>(undefined);

type DataProviderProps = {
  children: ReactNode | ReactNode[];
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

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

  const postData = async (newData: DataType) => {
    const prevData = data;
    // update context
    setData([...prevData, newData]);
    // update DB
    try {
      await axios.post("api/data/", newData, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("failed updating database", error);
      setData(prevData);
    }
  };

  return (
    <DataContext.Provider value={{ data, isLoading, error, postData }}>
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
