import { Children, CSSProperties, ReactNode, useState } from "react";
import Button from "./Button";
import Grid from "./Grid";

type Props = {
  children: ReactNode[];
  style?: CSSProperties;
};

const Details = ({ children, style }: Props) => {
  const childrenArray = Children.toArray(children);
  const [isOpen, setIsOpen] = useState(false);

  if (!(childrenArray && childrenArray.length >= 2))
    throw Error("there must be at least two children provided");

  const iconStyle: CSSProperties = {
    justifySelf: "center",
    alignSelf: "center",
    fontSize: "1.5em",
  };

  return (
    <Grid
      style={{
        border: "1px solid",
        gridTemplateColumns: "1.5em 1fr",
        ...style,
      }}
    >
      {isOpen ? (
        <Button
          icon
          onClick={() => setIsOpen(false)}
          tooltip="close"
          style={iconStyle}
        >
          expand_circle_down
        </Button>
      ) : (
        <Button
          icon
          onClick={() => setIsOpen(true)}
          tooltip="open"
          style={iconStyle}
        >
          expand_circle_right
        </Button>
      )}
      {childrenArray[0]}
      {isOpen &&
        childrenArray.slice(1).map((child, index) => (
          <div key={index} style={{ gridColumn: 2 }}>
            {child}
          </div>
        ))}
    </Grid>
  );
};

export default Details;
