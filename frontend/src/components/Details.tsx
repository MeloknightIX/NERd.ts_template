import { Children, CSSProperties, ReactNode, useState } from "react";
import FlexContainer from "./FlexContainer";
import GridContainer from "./GridContainer";

type DetailsProps = {
  children: ReactNode[];
  style?: CSSProperties;
  summaryStyle?: CSSProperties;
  icons?: [ReactNode | string, ReactNode | string];
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

  const closedIcon = (icons && icons[0]) || "▶" || ">";
  const openIcon = (icons && icons[1]) || "▼" || "v";

  return (
    <details
      style={{ ...container, ...style }}
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary
        style={{ listStyle: "none", ...summaryStyle }}
        aria-expanded={isOpen}
      >
        <GridContainer style={{ gridTemplateColumns: "1em 1fr" }}>
          {isOpen ? openIcon : closedIcon} {childrenArray[0]}
        </GridContainer>
      </summary>
      <GridContainer style={{ gridTemplateColumns: "1em 1fr" }}>
        {childrenArray.slice(1).map((child, index) => (
          <div key={index} style={{ gridColumn: 2 }}>
            {child}
          </div>
        ))}
      </GridContainer>
    </details>
  );
};
export default Details;
