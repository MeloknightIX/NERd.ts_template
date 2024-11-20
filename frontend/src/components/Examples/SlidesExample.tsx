import { useRef } from "react";
import FlexContainer from "../FlexContainer";
import Slides, { SlidesActions } from "../Slides";

const SlidesExample = () => {
  const slidesRef = useRef<SlidesActions>(null);
  return (
    <FlexContainer>
      <FlexContainer style={{ flexDirection: "row" }}>
        <button onClick={() => slidesRef.current?.setSlide("prev")}>
          previous slide
        </button>
        <button onClick={() => slidesRef.current?.setSlide("next")}>
          next slide
        </button>
      </FlexContainer>
      <Slides ref={slidesRef}>
        {[1, 2, 3, 4, 5].map((n, i) => (
          <div key={i}>Slide {n}</div>
        ))}
      </Slides>
    </FlexContainer>
  );
};
export default SlidesExample;
