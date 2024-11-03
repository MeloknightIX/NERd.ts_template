import { Link } from "react-router-dom";
import { useDataContext } from "../utils/DataContext";

const Home = () => {
  const { data, isLoading, error } = useDataContext();

  if (isLoading) return <div className="loading">loading…</div>;
  if (error) return <div className="error">Error: {error}</div>;
  return (
    <div>
      <h1>Hello World</h1>
      <h3>This is your stack: </h3>
      <ul>
        {data.map((item) => (
          <li key={item.key}>
            {item.key}: {item.value}
          </li>
        ))}
      </ul>
      <Link to="/somestringthatcannotbefound">
        Check out the not-found page!
      </Link>
    </div>
  );
};

export default Home;
