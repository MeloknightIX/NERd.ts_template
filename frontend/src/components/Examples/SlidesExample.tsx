import { useRef } from "react";
import Flex from "../Flex";
import Slides, { SlidesActions } from "../Slides";

const SlidesExample = () => {
  const slidesRef = useRef<SlidesActions>(null);
  return (
    <Flex>
      <Flex style={{ flexDirection: "row" }}>
        <button onClick={() => slidesRef.current?.setSlide("prev")}>
          previous slide
        </button>
        <button onClick={() => slidesRef.current?.setSlide("next")}>
          next slide
        </button>
      </Flex>
      <Slides ref={slidesRef}>
        {[1, 2, 3, 4, 5].map((n, i) => (
          <div key={i}>Slide {n}</div>
        ))}
      </Slides>
    </Flex>
  );
};
export default SlidesExample;
