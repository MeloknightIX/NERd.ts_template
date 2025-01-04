import { useState } from "react";
import { useUser } from "../../context/UserContext";
import Layout from "../components/Layout";
import Flex from "../components/Flex";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error, signin } = useUser();

  return (
    <Layout>
      <h1>Sign In</h1>
      {isLoading && <div>loading…</div>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signin(username, password);
        }}
      >
        <Flex style={{ alignItems: "center" }}>
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
          <input type="submit" value="sign in" />
          {error && <div>{error}</div>}
        </Flex>
      </form>
    </Layout>
  );
};

export default Signin;
