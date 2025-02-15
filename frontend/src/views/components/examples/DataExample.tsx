import { useState } from "react";
import { DataType, useData } from "../../../context/DataContext";
import Flex from "../Flex";
import useIsOffline from "../../../utils/useIsOffline";
import getMaxId from "../../../utils/getMaxId";
import Error from "../Error";
import Button from "../Button";

const DataExample = () => {
  const { isLoading, data, getError, otherError, addData, deleteData } =
    useData();
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
              row
              style={{
                alignContent: "center",
                padding: "0",
              }}
            >
              <p>
                {d.name}: {d.value}
              </p>
              <Button
                icon
                onClick={() => deleteData(d.id)}
                tooltip="delete item"
                disabled={isOffline}
                style={{
                  color: isOffline ? "GrayText" : "inherit",
                  fontSize: "inherit",
                }}
              >
                delete
              </Button>
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
      <Error error={getError} />
      <Error error={otherError} />
    </Flex>
  );
};
export default DataExample;
