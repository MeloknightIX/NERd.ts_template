import { Children, ReactNode } from "react";
import Flex from "./Flex";
import { Link } from "react-router-dom";
import useDarkmode from "../../utils/useDarkmode";
import Grid from "./Grid";

type LayoutProps = {
  children: ReactNode[];
};

const Layout = ({ children }: LayoutProps) => {
  const { toggleDarkmode } = useDarkmode();
  const childrenArray = Children.toArray(children);

  if (childrenArray.length < 2) {
    return null;
  }

  return (
    <Flex>
      <Grid
        style={{
          gridTemplateColumns: "auto 1fr auto",
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Link
          to="/"
          style={{
            color: "inherit",
            textDecoration: "inherit",
            fontSize: "2em",
            alignContent: "center",
          }}
          className="material-symbols-outlined"
        >
          home
        </Link>
        {childrenArray[0]}
        <span
          onClick={toggleDarkmode}
          style={{
            fontSize: "2em",
            alignContent: "center",
          }}
          className="material-symbols-outlined"
        >
          contrast_circle
        </span>
      </Grid>
      {childrenArray.slice(1).map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </Flex>
  );
};
export default Layout;
