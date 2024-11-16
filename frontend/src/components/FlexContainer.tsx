import { CSSProperties, ReactNode } from "react";

type FlexContainerProps = {
  children?: ReactNode;
  style?: CSSProperties;
};

const FlexContainer = ({ children, style }: FlexContainerProps) => {
  const FlexContainerStyles: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    padding: "0.5em",
    gap: "0.5em",

    justifyContent: "inherit",
    alignItems: "inherit",
    alignContent: "inherit",
  };
  return <div style={{ ...FlexContainerStyles, ...style }}>{children}</div>;
};

export default FlexContainer;
