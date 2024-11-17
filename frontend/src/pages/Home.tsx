import { Link } from "react-router-dom";
import FlexContainer from "../components/FlexContainer";
import { useDataContext } from "../components/DataContext";
import getColor from "../utils/getColor";

const Home = () => {
  const { isLoading, data, error } = useDataContext();

  return (
    <FlexContainer
      style={{
        backgroundImage: `radial-gradient(
          ${getColor("main")},
        ${getColor("background")}
        )`,
        color: getColor("text"),
      }}
    >
      <h1>Hello World</h1>
      <FlexContainer style={{ border: "1px solid" }}>
        <p>This is your stack: {isLoading && !error ? "(loading…)" : ""}</p>
        {!isLoading && (
          <ul>
            {data.map((d) => (
              <li key={d.id} style={{ marginLeft: "1em" }}>
                {d.name}: {d.value}
              </li>
            ))}
          </ul>
        )}
        {error && (
          <FlexContainer
            style={{
              border: "1px solid red",
              color: "red",
              alignItems: "center",
            }}
          >
            {error}
          </FlexContainer>
        )}
      </FlexContainer>
      <Link to="/somestringthatcannotbefound">
        Check out the not-found page!
      </Link>
    </FlexContainer>
  );
};

export default Home;
