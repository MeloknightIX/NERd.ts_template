import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import Layout from "../../components/Layout";
import Flex from "../../components/Flex";
import Error from "../../components/Error";

type ChangePasswordProps = {
  to: string;
};

const ChangePassword = ({ to }: ChangePasswordProps) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const { isLoading, error, changepw } = useUser();
  const navigate = useNavigate();
  const { user } = useUser();
  const username = user?.username as string;

  return (
    <Layout>
      <h1>Change Password</h1>
      {isLoading && <div>lädt…</div>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          changepw(username, oldPassword, newPassword1, newPassword2);
          if (!error) navigate(to);
        }}
      >
        <Flex style={{ alignItems: "center" }}>
          <input
            type="password"
            placeholder="old password"
            autoComplete="current-password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="new password"
            autoComplete="new-password"
            value={newPassword1}
            onChange={(e) => setNewPassword1(e.target.value)}
          />
          <input
            type="password"
            placeholder="new password (repeated)"
            autoComplete="new-password"
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
          />
          <input type="submit" value="change password" />
          <Error error={error} />
        </Flex>
      </form>
    </Layout>
  );
};

export default ChangePassword;
