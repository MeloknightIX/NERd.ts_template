import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { postData } from "../utils/fetchData";
import User from "../utils/types/User";

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signup: (username: string, password: string) => void;
  signin: (username: string, password: string) => void;
  signout: () => void;
  changepw: (
    username: string,
    oldPassword: string,
    newPassword1: string,
    newPassword2: string
  ) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserContextProviderProps = {
  children: ReactNode | ReactNode[];
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const url = "/api/user";

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) setUser(JSON.parse(localStorageUser));
  }, []);

  const signup = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user: User = await postData(url + "/signup", {
        username,
        password,
      });
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  };
  const signin = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await postData(url + "/signin", {
        username,
        password,
      });
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  };
  const signout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      setUser(null);
      localStorage.removeItem("user");
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  };
  const changepw = async (
    username: string,
    oldPassword: string,
    newPassword1: string,
    newPassword2: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await postData(url + "/changepw", {
        username,
        oldPassword,
        newPassword1,
        newPassword2,
      });
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const contextValue: UserContextType = {
    user,
    isLoading,
    error,
    signup,
    signin,
    signout,
    changepw,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser must be used within a UserContextProvider");
  return context;
};
