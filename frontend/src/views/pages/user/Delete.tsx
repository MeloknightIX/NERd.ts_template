import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import Layout from "../../components/Layout";
import Flex from "../../components/Flex";
import Error from "../../components/Error";

type DeleteProps = {
  to: string;
};

const Delete = ({ to }: DeleteProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error, user, deleteUser } = useUser();
  const navigate = useNavigate();

  return (
    <Layout>
      <h1>Delete Account</h1>
      {isLoading && <div>lädt…</div>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (username === user?.username) deleteUser(username, password);
          if (!error) navigate(to);
        }}
      >
        <Flex style={{ alignItems: "center" }}>
          <p style={{ textAlign: "center" }}>
            Please type “<b>{user?.username}</b>” in the field below to confirm
            account deletion. This action cannot be undone.
          </p>
          <input
            type="text"
            placeholder="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input type="submit" value="delete account" />
          <Error error={error} />
        </Flex>
      </form>
    </Layout>
  );
};

export default Delete;
