import { Link } from "react-router-dom";
import Flex from "../components/Flex";
import useIsOffline from "../utils/useIsOffline";

const NotFound = () => {
  const isOffline = useIsOffline();
  return (
    <Flex>
      <h1>Not Found</h1>
      <p>It appears the page you are looking for could not be found. </p>
      {isOffline && <p>This error may be occuring because you are offline. </p>}
      <Link to="/">Navigate back to the homepage</Link>
    </Flex>
  );
};

export default NotFound;
