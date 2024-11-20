import { Children, CSSProperties, ReactNode } from "react";

type DetailsProps = {
  children: ReactNode[];
  style?: CSSProperties;
};

const Details = ({ children, style }: DetailsProps) => {
  const childrenArray = Children.toArray(children);

  if (childrenArray.length < 2) {
    return null;
  }

  return (
    <details style={style}>
      <summary>{childrenArray[0]}</summary>
      {childrenArray.slice(1).map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </details>
  );
};
export default Details;
