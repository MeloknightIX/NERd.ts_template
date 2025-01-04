import { ReactNode } from "react";
import { useUser } from "../../context/UserContext";
import Signin from "../pages/Signin";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  if (!user) return <Signin />;
  return <>{children}</>;
};
export default RequireAuth;
