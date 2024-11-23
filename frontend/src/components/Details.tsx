import { Children, CSSProperties, ReactNode, useState } from "react";
import Grid from "./Grid";

type DetailsProps = {
  children: ReactNode[];
  style?: CSSProperties;
  summaryStyle?: CSSProperties;
  icons?: [string, string];
};

const container: CSSProperties = {
  padding: "0.5em",
  border: "1px solid",
};

const Details = ({ children, style, summaryStyle, icons }: DetailsProps) => {
  const childrenArray = Children.toArray(children);
  const [isOpen, setIsOpen] = useState(false);

  if (childrenArray.length < 2) {
    return null;
  }

  const iconStyle: CSSProperties = {
    justifySelf: "center",
    alignSelf: "center",
  };

  const closedIcon =
    icons && icons[0] ? (
      <span style={iconStyle}>{icons[0]}</span>
    ) : (
      <span style={iconStyle} className="material-symbols-outlined">
        expand_circle_right
      </span>
    );
  const openIcon =
    icons && icons[1] ? (
      <span style={iconStyle}>{icons[1]}</span>
    ) : (
      <span style={iconStyle} className="material-symbols-outlined">
        expand_circle_down
      </span>
    );

  return (
    <details
      style={{ ...container, ...style }}
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary
        style={{ listStyle: "none", ...summaryStyle }}
        aria-expanded={isOpen}
      >
        <Grid style={{ gridTemplateColumns: "1em 1fr" }}>
          {isOpen ? openIcon : closedIcon} {childrenArray[0]}
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
