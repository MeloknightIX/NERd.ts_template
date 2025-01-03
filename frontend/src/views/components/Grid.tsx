import { CSSProperties, ReactNode } from "react";

type GridProps = {
  children?: ReactNode;
  style?: CSSProperties;
};

const Grid = (props: GridProps) => {
  const GridStyles: CSSProperties = {
    display: "grid",
    gridTemplateRows: "auto",
    gridTemplateColumns: "auto",
    padding: "0.5em",
    gap: "0.5em",

    justifyContent: "inherit",
    alignItems: "inherit",
    alignContent: "inherit",
    justifyItems: "inherit",
  };
  return <div style={{ ...GridStyles, ...props.style }}>{props.children}</div>;
};

export default Grid;
