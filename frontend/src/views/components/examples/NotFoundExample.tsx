import { useNavigate } from "react-router-dom";
import Flex from "../Flex";
import Button from "../Button";

const NotFoundExample = () => {
  const navigate = useNavigate();
  return (
    <Flex row>
      <Button
        onClick={() => navigate("/somestringthatcannotbefound")}
        tooltip="not-found page"
      >
        Check out the not-found page!
      </Button>
      <p>(also try going offline)</p>
    </Flex>
  );
};
export default NotFoundExample;
