import { Link } from "react-router-dom";
import FlexContainer from "../FlexContainer";

const NotFoundExample = () => {
  return (
    <FlexContainer style={{ flexDirection: "row" }}>
      <Link to="/somestringthatcannotbefound">
        Check out the not-found page!
      </Link>
      <p>(also try going offline)</p>
    </FlexContainer>
  );
};
export default NotFoundExample;
