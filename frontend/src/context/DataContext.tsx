import { createContext, ReactNode, useContext, useState } from "react";
import useIsOffline from "../utils/useIsOffline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteData, fetchData, patchData, postData } from "../utils/fetchData";
import { useUser } from "./UserContext";

export type DataType = {
  id: number;
  name: string;
  value: string;
};

type DataContextType = {
  data?: DataType[];
  isLoading: boolean;
  getError: string | null;
  otherError: string | null;
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
  const isOffline = useIsOffline();
  const queryClient = useQueryClient();
  const [otherError, setOtherError] = useState<string | null>(null);
  const { user } = useUser();
  const token = user?.token;

  // GET query
  const {
    data,
    isLoading,
    error: getError,
  } = useQuery<DataType[]>({
    queryKey: ["data"],
    queryFn: () => fetchData(url, token),
  });
  // POST, PATCH, DELETE mutations
  const dataMutationSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["data"] });
  };
  const dataMutationError = (error: string) => {
    setOtherError(error || "error changing data");
  };
  const addDataMutation = useMutation({
    mutationFn: (newData: DataType) => postData(url, newData, token),
    onSuccess: dataMutationSuccess,
    onError: (error) => dataMutationError(error.message),
    retry: false,
  });
  const updateDataMutation = useMutation({
    mutationFn: ({ id, updatedData }: { id: number; updatedData: DataType }) =>
      patchData(url, id, updatedData, token),
    onSuccess: dataMutationSuccess,
    onError: (error) => dataMutationError(error.message),
    retry: false,
  });
  const deleteDataMutation = useMutation({
    mutationFn: (id: number) => deleteData(url, id, token),
    onSuccess: dataMutationSuccess,
    onError: (error) => dataMutationError(error.message),
    retry: false,
  });

  const contextValue: DataContextType = {
    data,
    isLoading,
    getError: getError ? getError.message : null,
    otherError: otherError ? otherError : null,
    isOffline,
    addData: (newData) => {
      if (isOffline) return setOtherError("to add data, you must be online");
      addDataMutation.mutate(newData);
    },
    updateData: (id, updatedData) => {
      if (isOffline) return setOtherError("to update data, you must be online");
      updateDataMutation.mutate({ id, updatedData });
    },
    deleteData: (id) => {
      if (isOffline) return setOtherError("to delete data, you must be online");
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
