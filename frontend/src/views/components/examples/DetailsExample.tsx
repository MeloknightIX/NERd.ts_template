import Details from "../Details";
import Flex from "../Flex";

const DetailsExample = () => {
  return (
    <Flex>
      <Details icons={["✘", "✔︎"]}>
        <h5>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
          ab!
        </h5>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt
          obcaecati, sapiente fugiat quasi distinctio cum eaque saepe veniam
          dolorem iure unde ratione sed recusandae asperiores amet. Unde tempora
          sit et.
        </p>
      </Details>
      <Details icons={[":-(", ":-)"]}>
        <h5>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque
          repellendus odio at.
        </h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          eveniet voluptas aut dolores perspiciatis ullam sequi exercitationem
          sit quasi minima voluptatem quidem, perferendis cum quo!
        </p>
      </Details>
    </Flex>
  );
};
export default DetailsExample;
