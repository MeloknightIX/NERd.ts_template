import { CSSProperties } from "react";
import FlexContainer from "../components/FlexContainer";
import DataExample from "../components/examples/DataExample";
import SlidesExample from "../components/examples/SlidesExample";
import NotFoundExample from "../components/examples/NotFoundExample";
import Details from "../components/Details";
import useDarkmode from "../utils/useDarkmode";
import getColor from "../utils/getColor";

export const container: CSSProperties = {
  padding: "0.5em",
  border: "1px solid",
};

const Home = () => {
  const { toggleDarkmode } = useDarkmode();
  return (
    <FlexContainer>
      <FlexContainer
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <h1>Hello World</h1>
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
      </FlexContainer>
      <Details style={{ ...container }}>
        <h3>service workers and PWA</h3>
        <p>
          To use service worker and PWA functionality, switch seviceWorkerOptIn
          in index.tsx to true and make sure you are serving via localhost or
          https.
        </p>
      </Details>
      <Details style={{ ...container }} icons={[<h3>{">"}</h3>, <h3>v</h3>]}>
        <h3>example for fetching and changing data using {"<DataContext>"}</h3>
        <DataExample />
      </Details>
      <Details style={{ ...container }} icons={["?)", "✔︎)"]}>
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
