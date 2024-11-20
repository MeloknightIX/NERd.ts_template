import { Link } from "react-router-dom";
import FlexContainer from "../FlexContainer";

const NotFoundExample = () => {
  return (
    <FlexContainer>
      <Link to="/somestringthatcannotbefound">
        Check out the not-found page!
      </Link>
    </FlexContainer>
  );
};
export default NotFoundExample;
