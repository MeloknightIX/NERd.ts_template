import { useState } from "react";
import { DataType, useData } from "../DataContext";
import Flex from "../Flex";
import useIsOffline from "../../utils/useIsOffline";
import getMaxId from "../../utils/getMaxId";

const DataExample = () => {
  const { isLoading, data, error, addData, deleteData } = useData();
  const [formData, setFormData] = useState<DataType>({
    id: -1,
    name: "",
    value: "",
  });
  const isOffline = useIsOffline();
  return (
    <Flex>
      <p>This is your stack: {isLoading ? "(loading…)" : ""}</p>
      <ul>
        {data?.map((d) => (
          <li key={d.id}>
            <Flex
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
            </Flex>
          </li>
        ))}
      </ul>
      <Flex>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addData({ ...formData, id: getMaxId(data || []) + 1 });
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
      </Flex>
      {error && (
        <Flex
          style={{
            border: "1px solid red",
            color: "red",
            alignItems: "center",
          }}
        >
          {error}
        </Flex>
      )}
    </Flex>
  );
};
export default DataExample;
