import Flex from "../components/Flex";
import DataExample from "../components/examples/DataExample";
import SlidesExample from "../components/examples/SlidesExample";
import NotFoundExample from "../components/examples/NotFoundExample";
import Details from "../components/Details";
import useDarkmode from "../utils/useDarkmode";

const Home = () => {
  const { toggleDarkmode } = useDarkmode();
  return (
    <Flex>
      <Flex
        row
        style={{
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
      </Flex>
      <Details>
        <h3>service workers and PWA</h3>
        <p>
          To use service worker and PWA functionality, switch seviceWorkerOptIn
          in index.tsx to true and make sure you are serving via localhost or
          https.
        </p>
      </Details>
      <Details icons={[">", "v"]}>
        <h3>example for fetching and changing data using {"<DataContext>"}</h3>
        <DataExample />
      </Details>
      <Details icons={["?)", "✔︎)"]}>
        <h3>
          example for setting up different slides and switching between them
          using {"<Slides>"}
        </h3>
        <SlidesExample />
      </Details>
      <Details>
        <h3>example for linking to the not-found page</h3>
        <NotFoundExample />
      </Details>
    </Flex>
  );
};

export default Home;
