import Flex from "./Flex";

type ErrorProps = {
  error: string | null;
};

const Error = ({ error }: ErrorProps) => {
  if (error) {
    return (
      <Flex
        style={{
          border: "1px solid red",
          color: "red",
          alignItems: "center",
        }}
      >
        {error}
      </Flex>
    );
  } else return null;
};
export default Error;
