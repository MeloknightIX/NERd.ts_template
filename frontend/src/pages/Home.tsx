import DataExample from "../components/examples/DataExample";
import SlidesExample from "../components/examples/SlidesExample";
import NotFoundExample from "../components/examples/NotFoundExample";
import Details from "../components/Details";
import Layout from "../components/Layout";
import DetailsExample from "../components/examples/DetailsExample";

const Home = () => {
  return (
    <Layout>
      <h1>Hello World</h1>
      <Details>
        <h3>service workers and PWA</h3>
        <p>
          To use service worker and PWA functionality, switch seviceWorkerOptIn
          in index.tsx to true and make sure you are serving via localhost or
          https.
        </p>
      </Details>
      <Details>
        <h3>example for fetching and changing data using {"<DataContext>"}</h3>
        <DataExample />
      </Details>
      <Details>
        <h3>
          example for setting up different slides and switching between them
          using {"<Slides>"}
        </h3>
        <SlidesExample />
      </Details>
      <Details>
        <h3>example for using custom {"<Details>"} icons</h3>
        <DetailsExample />
      </Details>
      <Details>
        <h3>example for linking to the not-found page</h3>
        <NotFoundExample />
      </Details>
    </Layout>
  );
};

export default Home;
