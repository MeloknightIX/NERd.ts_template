import { Link } from "react-router-dom";
import FlexContainer from "../components/FlexContainer";
import { DataType, useData } from "../components/DataContext";
import getNewId from "../utils/getNewId";
import { useState } from "react";
import useIsOffline from "../utils/useIsOffline";

const Home = () => {
  const { isLoading, data, error, addData, deleteData } = useData();
  const [formData, setFormData] = useState<DataType>({
    id: -1,
    name: "",
    value: "",
  });
  const { isOffline } = useIsOffline();

  return (
    <FlexContainer>
      <h1>Hello World</h1>
      <FlexContainer style={{ border: "1px solid" }}>
        <p>This is your stack: {isLoading ? "(loading…)" : ""}</p>
        <ul>
          {data?.map((d) => (
            <li key={d.id}>
              <FlexContainer
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  padding: "0",
                }}
              >
                <p>
                  {d.name}: {d.value}
                </p>
                <button
                  onClick={() => deleteData(d.id)}
                  disabled={isOffline}
                  style={{
                    color: isOffline ? "GrayText" : "inherit",
                    backgroundColor: "inherit",
                    border: "none",
                    fontSize: "inherit",
                  }}
                  className="material-symbols-outlined"
                >
                  delete
                </button>
              </FlexContainer>
            </li>
          ))}
        </ul>
        <FlexContainer>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addData({ ...formData, id: getNewId(data || []) });
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="short form"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev: DataType) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <input
              type="text"
              name="value"
              placeholder="technology"
              value={formData.value}
              onChange={(e) =>
                setFormData((prev: DataType) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <input type="submit" disabled={isOffline} value="add" />
          </form>
        </FlexContainer>
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
