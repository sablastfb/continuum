import { useRef, useState } from "react";
import {
  Eraser,
  Clipboard,
  Pen,
  Image,
  Type,
  Link,
  Lasso,
  Ruler,
  LayoutDashboard,
  Camera,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import {
  defaultButtonsBackground,
  defaultIconSize,
  defaultToolBarHeight,
  defaultToolBarPadding,
} from "../../../data/constants/CanvasConstants";

import DoUnDoComponent from "./DoUnDoComponent";
import BookmankrButton from "../../bookmark/BookmankrButton";
import ArrayDivider from "../../misc/ArrayDivider";
import { Direction } from "../../../data/store/LayoutStore";

export interface ToolsMenueParameter {
  direction: Direction;
}

function ToolsMenue({ direction }: ToolsMenueParameter) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right", scrollAmount = 100) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const newScrollLeft =
      container.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  const handleScroll = (e: { deltaY: number }): void => {
    const container = scrollContainerRef.current;
    if (!container) return;
    scroll("left", e.deltaY);
    const newScrollLeft = container.scrollLeft + e.deltaY;

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  const [leftArrow, setLeftArrow] = useState(false);
  const [rightArror, setRightArror] = useState(false);

  return (
    <>
      <div
        className={`flex ${
          direction === "vertical" && "flex-col"
        } justify-center items-center rounded-md   
            ${defaultToolBarHeight}  ${defaultButtonsBackground}
            gap-5
        `}
      >
        <div className={`flex h-full pointer-events-auto  rounded-2xl`}>
          <div
            className={`cursor-pointer h-full  flex justify-center items-center bg-white/10 rounded-l-2xl  `}
            onClick={() => scroll("left")}
          >
            <ChevronLeft size={20} />
          </div>
          <div
            className="flex  justify-start items-center gap-4 rounded-md max-w-[35vw] overflow-hidden px-2"
            ref={scrollContainerRef}
            onWheel={handleScroll}
          >
            <div>  <Pen size={defaultIconSize} /></div>
            <div>  <Eraser size={defaultIconSize} /></div>
            <div>  <Image size={defaultIconSize} /></div>
            <div>  <Lasso size={defaultIconSize} /></div>
            <div>  <BookmankrButton /></div>
            <div>  <Ruler size={defaultIconSize} /></div>
            <div>  <LayoutDashboard size={defaultIconSize} /></div>
            <div>  <Camera size={defaultIconSize} /></div>
            <div>  <Type size={defaultIconSize} /></div>
            <div>  <Link size={defaultIconSize} /></div>
            <div>  <Clipboard size={defaultIconSize} /></div>
          </div>
          <div
            className={`cursor-pointer h-full   flex justify-center items-center bg-white/10 rounded-r-2xl`}
            onClick={() => scroll("right")}
          >
            <ChevronRight size={20} />
          </div>
        </div>
        <ArrayDivider orjentation="horizontal"/>
        <DoUnDoComponent />
      </div>
    </>
  );
}

export default ToolsMenue;
