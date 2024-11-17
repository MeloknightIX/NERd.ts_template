import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDELETE, useGET, usePATCH, usePOST } from "../utils/useFetch";
import useIsOffline from "../utils/useIsOffline";

export type DataType = {
  id: number;
  name: string;
  value: string;
};

type DataContextType = {
  data: DataType[];
  isLoading: boolean;
  error: null | string;
  isOffline: boolean;
  postDataCtx: (newData: DataType) => Promise<void>;
  deleteDataCtx: (index: number) => Promise<void>;
  patchDataCtx: (index: number, newData: DataType) => Promise<void>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

type DataProviderProps = {
  children: ReactNode | ReactNode[];
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const url = "/api/data/";
  const { isOffline } = useIsOffline();

  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  const {
    data: fetchedData,
    getData,
    error: fetchError,
  } = useGET<DataType>(url);
  const { postData, error: postError } = usePOST<DataType>(url);
  const { deleteData, error: deleteError } = useDELETE(url);
  const { patchData, error: patchError } = usePATCH(url);

  useEffect(() => {
    const fetchDataOnMount = async () => {
      setIsLoading(true);
      await getData();
      setIsLoading(false);
    };
    fetchDataOnMount();
  }, []);

  useEffect(() => {
    if (fetchedData) setData(fetchedData);
    setError(fetchError);
  }, [fetchedData, fetchError]);

  const postDataCtx = async (newData: DataType) => {
    if (isOffline) return setError("you must be online to change data");
    setIsLoading(true);
    await postData(newData);
    await getData();
    setIsLoading(false);
    setError(postError);
  };
  const deleteDataCtx = async (id: number) => {
    if (isOffline) return setError("you must be online to change data");
    if (id < 0) return setError("you must enter a valid id");
    setIsLoading(true);
    await deleteData(id);
    await getData();
    setIsLoading(false);
    setError(deleteError);
  };
  const patchDataCtx = async (id: number, newData: DataType) => {
    if (isOffline) return setError("you must be online to change data");
    if (id < 0) return setError("you must enter a valid id");
    setIsLoading(true);
    await patchData(id, newData);
    await getData();
    setIsLoading(false);
    setError(patchError);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        isLoading,
        error,
        postDataCtx,
        deleteDataCtx,
        patchDataCtx,
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
