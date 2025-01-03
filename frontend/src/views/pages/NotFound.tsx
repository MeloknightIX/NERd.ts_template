import { Link } from "react-router-dom";
import useIsOffline from "../../utils/useIsOffline";
import Layout from "../components/Layout";

const NotFound = () => {
  const isOffline = useIsOffline();
  return (
    <Layout>
      <h1>Not Found</h1>
      <p>It appears the page you are looking for could not be found. </p>
      {isOffline && <p>This error may be occuring because you are offline. </p>}
      <Link to="/">Navigate back to the homepage</Link>
    </Layout>
  );
};

export default NotFound;
