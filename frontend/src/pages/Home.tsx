import { Link } from "react-router-dom";
import FlexContainer from "../components/FlexContainer";

const Home = () => {
  return (
    <FlexContainer>
      <h1>Hello World</h1>
      <Link to="/somestringthatcannotbefound">
        Check out the not-found page!
      </Link>
    </FlexContainer>
  );
};

export default Home;
