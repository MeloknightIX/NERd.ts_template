import { Children, CSSProperties, ReactNode, useState } from "react";
import FlexContainer from "./FlexContainer";

type DetailsProps = {
  children: ReactNode[];
  style?: CSSProperties;
  summaryStyle?: CSSProperties;
  icons?: [ReactNode | string, ReactNode | string];
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
      style={style}
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary
        style={{ listStyle: "none", ...summaryStyle }}
        aria-expanded={isOpen}
      >
        <FlexContainer
          style={{ flexDirection: "row", alignContent: "center", padding: 0 }}
        >
          {isOpen ? openIcon : closedIcon} {childrenArray[0]}
        </FlexContainer>
      </summary>
      {childrenArray.slice(1).map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </details>
  );
};
export default Details;
