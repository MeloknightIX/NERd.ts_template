import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import Layout from "../../components/Layout";
import Flex from "../../components/Flex";
import Error from "../../components/Error";

type Props = {
  to?: string;
};

const Signin = ({ to }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState(true);
  const { isLoading, error, signin, signup } = useUser();
  const navigate = useNavigate();

  return (
    <Layout>
      <h1>Sign In</h1>
      {isLoading && <div>loading…</div>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (account) signin(username, password);
          else signup(username, password);
          if (!error && to) navigate(to);
        }}
      >
        <Flex style={{ alignItems: "center" }}>
          <Flex row>
            <label htmlFor="account">I already have an account</label>
            <input
              type="checkbox"
              id="account"
              checked={account}
              onChange={(e) => setAccount(e.target.checked)}
              style={{ minWidth: "auto" }}
            />
          </Flex>
          <input
            type="text"
            placeholder="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value={account ? "sign in" : "sign up"} />
          <Error error={error} />
        </Flex>
      </form>
    </Layout>
  );
};

export default Signin;
