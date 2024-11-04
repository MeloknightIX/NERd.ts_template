import { Link } from "react-router-dom";
import { useDataContext } from "../utils/DataContext";
import { useState } from "react";

const Home = () => {
  const { data, isLoading, error, isOffline, postData, deleteData } =
    useDataContext();
  const defaultForm = { key: "", value: "" };
  const [form, setForm] = useState(defaultForm);

  if (error)
    return (
      <div className="error">
        error loading data <br />
        {error}
      </div>
    );
  return (
    <div>
      <h1>Hello World</h1>
      <h3>This is your stack: {isLoading ? "(loading)" : ""} </h3>
      <ul>
        {data.map((item) => (
          <li key={item.id} style={{ display: "flex", columnGap: "0.5em" }}>
            {item.key}: {item.value}
            <button
              style={{
                padding: "0.125em",
                backgroundColor: "unset",
                border: "0.5px solid gray",
                borderRadius: "10px",
                fontSize: "1rem",
              }}
              className="material-symbols-outlined"
              disabled={isOffline}
              title={isOffline ? "only available when online" : undefined}
              onClick={() => {
                if (item.id) deleteData(item.id);
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
      <h3>Add technologies: </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (form.key !== "") postData(form);
          setForm(defaultForm);
        }}
      >
        <input
          type="text"
          name="key"
          id="keyInput"
          placeholder="key"
          value={form.key}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, key: e.target.value }))
          }
        />
        <input
          type="text"
          name="value"
          id="valueInput"
          placeholder="value"
          value={form.value}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, value: e.target.value }))
          }
        />
        <input
          type="submit"
          value="add"
          disabled={isOffline}
          title={isOffline ? "only available when online" : undefined}
        />
      </form>
      <Link to="/somestringthatcannotbefound">
        Check out the not-found page!
      </Link>
    </div>
  );
};

export default Home;
