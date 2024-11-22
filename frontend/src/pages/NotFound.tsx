import { Link } from "react-router-dom";
import FlexContainer from "../components/FlexContainer";
import useIsOffline from "../utils/useIsOffline";

const NotFound = () => {
  const isOffline = useIsOffline();
  return (
    <FlexContainer>
      <h1>Not Found</h1>
      <p>It appears the page you are looking for could not be found. </p>
      {isOffline && <p>This error may be occuring because you are offline. </p>}
      <Link to="/">Navigate back to the homepage</Link>
    </FlexContainer>
  );
};

export default NotFound;
