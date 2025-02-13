import { useRef } from "react";
import Flex from "../Flex";
import Slides, { SlidesActions } from "../Slides";
import Button from "../Button";

const SlidesExample = () => {
  const slidesRef = useRef<SlidesActions>(null);
  return (
    <Flex>
      <Flex row>
        <Button
          onClick={() => slidesRef.current?.setSlide("prev")}
          tooltip="go to previous slide"
        >
          previous slide
        </Button>
        <Button
          onClick={() => slidesRef.current?.setSlide("next")}
          tooltip="go to next slide"
        >
          next slide
        </Button>
      </Flex>
      <Slides ref={slidesRef}>
        {[1, 2, 3, 4, 5].map((n, i) => (
          <Flex key={i}>Slide {n}</Flex>
        ))}
      </Slides>
    </Flex>
  );
};
export default SlidesExample;
