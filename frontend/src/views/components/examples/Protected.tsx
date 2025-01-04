import { Link, Navigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import Layout from "../Layout";

const Protected = () => {
  const { signout } = useUser();
  return (
    <Layout>
      <h1>this page is protected</h1>
      <p>you have signed in correctly</p>
      <button onClick={signout}>signout</button>
      <button>
        <Link
          to="/changepw"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          change password
        </Link>
      </button>
      <button>
        <Link
          to="/delete"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          delete account
        </Link>
      </button>
    </Layout>
  );
};

export default Protected;
