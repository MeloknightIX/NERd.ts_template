import { CSSProperties } from "react";
import FlexContainer from "../components/FlexContainer";
import DataExample from "../components/Examples/DataExample";
import SlidesExample from "../components/Examples/SlidesExample";
import NotFoundExample from "../components/Examples/NotFoundExample";
import Details from "../components/Details";

export const container: CSSProperties = {
  padding: "0.5em",
  border: "1px solid",
};

const Home = () => {
  return (
    <FlexContainer>
      <h1>Hello World</h1>
      <Details style={{ ...container }}>
        <h3>example for fetching and changing data using {"<DataContext>"}</h3>
        <DataExample />
      </Details>
      <Details style={{ ...container }}>
        <h3>
          example for setting up different slides and switching between them
          using {"<Slides>"}
        </h3>
        <SlidesExample />
      </Details>
      <Details style={{ ...container }}>
        <h3>example for linking to the not-found page</h3>
        <NotFoundExample />
      </Details>
    </FlexContainer>
  );
};

export default Home;
