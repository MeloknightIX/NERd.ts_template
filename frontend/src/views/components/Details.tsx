import { Children, CSSProperties, ReactNode, useState } from "react";
import Grid from "./Grid";
import Button from "./Button";

type DetailsProps = {
  children: ReactNode[];
  style?: CSSProperties;
  summaryStyle?: CSSProperties;
};

const container: CSSProperties = {
  padding: "0.5em",
  border: "1px solid",
};

const Details = ({ children, style, summaryStyle }: DetailsProps) => {
  const childrenArray = Children.toArray(children);
  const [isOpen, setIsOpen] = useState(false);

  if (childrenArray.length < 2) {
    return null;
  }

  const iconStyle: CSSProperties = {
    justifySelf: "center",
    alignSelf: "center",
  };

  return (
    <details
      style={{ ...container, ...style }}
      onToggle={(e) => {
        if (e.target !== e.currentTarget) return;
        setIsOpen((e.target as HTMLDetailsElement).open);
      }}
    >
      <summary
        style={{ listStyle: "none", ...summaryStyle }}
        aria-expanded={isOpen}
      >
        <Grid style={{ gridTemplateColumns: "1em 1fr" }}>
          {isOpen ? (
            <Button icon tooltip="close" style={iconStyle}>
              expand_circle_down
            </Button>
          ) : (
            <Button icon tooltip="close" style={iconStyle}>
              expand_circle_right
            </Button>
          )}
          {childrenArray[0]}
        </Grid>
      </summary>
      <hr />
      <Grid style={{ gridTemplateColumns: "1em 1fr" }}>
        {childrenArray.slice(1).map((child, index) => (
          <div key={index} style={{ gridColumn: 2 }}>
            {child}
          </div>
        ))}
      </Grid>
    </details>
  );
};
export default Details;
