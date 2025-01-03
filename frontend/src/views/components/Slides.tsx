import {
  Children,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from "react";

export type SlidesActions = {
  setSlide: (slideAction: "prev" | "next" | number) => void;
};

type SlidesProps = { children: ReactNode[] };

const Slides = forwardRef<SlidesActions, SlidesProps>(
  ({ children }: SlidesProps, ref) => {
    const totalSlides = Children.count(children);
    const [currentSlide, setCurrentSlide] = useState(0);

    const setSlide = (slideAction: "prev" | "next" | number) => {
      if (slideAction === "prev") {
        setCurrentSlide((p) => (p - 1 >= 0 ? p - 1 : totalSlides - 1));
      } else if (slideAction === "next") {
        setCurrentSlide((p) => (p + 1 < totalSlides ? p + 1 : 0));
      } else if (typeof slideAction === "number") {
        const slideNumber = slideAction;
        if (slideNumber >= 0 && slideNumber < totalSlides) {
          setCurrentSlide(slideNumber);
        } else {
          setCurrentSlide(totalSlides - 1);
        }
      }
    };
    useImperativeHandle(ref, () => ({ setSlide }));

    return <div>{Children.toArray(children)[currentSlide]}</div>;
  }
);
export default Slides;
