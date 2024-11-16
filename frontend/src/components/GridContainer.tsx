import { CSSProperties, ReactNode } from "react";

type GridContainerProps = {
  children?: ReactNode;
  style?: CSSProperties;
};

const GridContainer = (props: GridContainerProps) => {
  const GridContainerStyles: CSSProperties = {
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
  return (
    <div style={{ ...GridContainerStyles, ...props.style }}>
      {props.children}
    </div>
  );
};

export default GridContainer;
