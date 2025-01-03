import { Link } from "react-router-dom";
import Flex from "../Flex";

const NotFoundExample = () => {
  return (
    <Flex row>
      <Link to="/somestringthatcannotbefound">
        Check out the not-found page!
      </Link>
      <p>(also try going offline)</p>
    </Flex>
  );
};
export default NotFoundExample;
