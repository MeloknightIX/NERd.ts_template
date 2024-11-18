import { createContext, ReactNode, useContext } from "react";
import useIsOffline from "../utils/useIsOffline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteData, fetchData, patchData, postData } from "../utils/fetchData";

export type DataType = {
  id: number;
  name: string;
  value: string;
};

type DataContextType = {
  data?: DataType[];
  isLoading: boolean;
  error: null | string;
  isOffline: boolean;
  addData: (newData: DataType) => void;
  updateData: (id: number, updatedData: DataType) => void;
  deleteData: (id: number) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

type DataProviderProps = {
  children: ReactNode | ReactNode[];
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const url = "/api/data/";
  const { isOffline } = useIsOffline();
  const queryClient = useQueryClient();

  // GET query
  const { data, isLoading, error } = useQuery<DataType[]>({
    queryKey: ["data"],
    queryFn: () => fetchData(url),
  });
  // POST, PATCH, DELETE mutations
  const dataMutationSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["data"] });
  };
  const dataMutationError = (error: string) => {
    alert(error || "error changing data");
  };
  const addDataMutation = useMutation({
    mutationFn: (newData: DataType) => postData(url, newData),
    onSuccess: dataMutationSuccess,
    onError: (error) => dataMutationError(error.message),
    retry: false,
  });
  const updateDataMutation = useMutation({
    mutationFn: ({ id, updatedData }: { id: number; updatedData: DataType }) =>
      patchData(url, id, updatedData),
    onSuccess: dataMutationSuccess,
    onError: (error) => dataMutationError(error.message),
    retry: false,
  });
  const deleteDataMutation = useMutation({
    mutationFn: (id: number) => deleteData(url, id),
    onSuccess: dataMutationSuccess,
    onError: (error) => dataMutationError(error.message),
    retry: false,
  });

  const contextValue: DataContextType = {
    data,
    isLoading,
    error: error ? error.message : null,
    isOffline,
    addData: (newData) => {
      if (isOffline) return alert("to add data, you must be online");
      addDataMutation.mutate(newData);
    },
    updateData: (id, updatedData) => {
      if (isOffline) return alert("to update data, you must be online");
      updateDataMutation.mutate({ id, updatedData });
    },
    deleteData: (id) => {
      if (isOffline) return alert("to delete data, you must be online");
      deleteDataMutation.mutate(id);
    },
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
