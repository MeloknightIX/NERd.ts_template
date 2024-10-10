import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <Link to="/somestringthatcannotbefound">
        Check out the not-found page!
      </Link>
    </div>
  );
};

export default Home;
