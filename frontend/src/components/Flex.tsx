import { CSSProperties, ReactNode } from "react";

type FlexProps = {
  children?: ReactNode;
  style?: CSSProperties;
};

const Flex = ({ children, style }: FlexProps) => {
  const FlexStyles: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    padding: "0.5em",
    gap: "0.5em",

    justifyContent: "inherit",
    alignItems: "inherit",
    alignContent: "inherit",
  };
  return <div style={{ ...FlexStyles, ...style }}>{children}</div>;
};

export default Flex;
