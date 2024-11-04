import { Link } from "react-router-dom";
import { useDataContext } from "../utils/DataContext";
import { useState } from "react";

const Home = () => {
  const { data, isLoading, error, postData, isOffline } = useDataContext();
  const [form, setForm] = useState({ key: "", value: "" });

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
      <h3>Add technologies: </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (form.key !== "" && form.value !== "") postData(form);
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
