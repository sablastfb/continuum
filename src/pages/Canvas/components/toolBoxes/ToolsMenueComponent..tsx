import { useRef } from "react";
import {
  Clipboard,
  Image,
  Type,
  Link,
  Ruler,
} from "lucide-react";
import {
  DefaultButtonsBackground,
  DefaultIconSize,
  DefaultToolBarHeight,
  DefaultToolBarPadding,
} from "../../data/constants/CanvasConstants";

import BookmankrButton from "../tools/bookmarkComponents/BookmankrButton";
import ArrayDivider from "../misc/ArrayDivider";
import { Direction } from "../../data/store/LayoutStore";
import CurveToolMenue from "../tools/curveComponents/CurveToolMenue";
import DoUnDoComponent from "./DoUnDoComponent";
import EraserToolMenue from "../tools/eraseComponents/EraserToolMenue";
import SelectionToolMenue from "../tools/selectonComponents/SelectionToolMenue";
import ShapeToolMenue from "../tools/shapesComponents/ShapeToolMenue";

export interface ToolsMenueParameter {
  direction: Direction;
}

function ToolsMenue({ direction }: ToolsMenueParameter) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // const scroll = (direction: "left" | "right", scrollAmount = 100) => {
  //   const container = scrollContainerRef.current;
  //   if (!container) return;

  //   const newScrollLeft =
  //     container.scrollLeft +
  //     (direction === "left" ? -scrollAmount : scrollAmount);

  //   container.scrollTo({
  //     left: newScrollLeft,
  //     behavior: "smooth",
  //   });
  // };

  // const handleScroll = (e: { deltaY: number }): void => {
  //   const container = scrollContainerRef.current;
  //   if (!container) return;
  //   scroll("left", e.deltaY);
  //   const newScrollLeft = container.scrollLeft + e.deltaY;

  //   container.scrollTo({
  //     left: newScrollLeft,
  //     behavior: "smooth",
  //   });
  // };


  return (
    <>
      <div
        className={`flex ${ direction === "vertical" && "flex-col"} 
        justify-center items-center rounded-md gap-5 pointer-events-auto
            ${DefaultToolBarHeight}  ${DefaultButtonsBackground} ${DefaultToolBarPadding}
        `}
      >
     
            <CurveToolMenue/>
            <SelectionToolMenue/>
            <EraserToolMenue/>
            <ShapeToolMenue/>
            <div>  <Type size={DefaultIconSize} /></div>

            <div>  <Image size={DefaultIconSize} /></div>
            <div>  <Ruler size={DefaultIconSize} /></div>
            <div>  <Link size={DefaultIconSize} /></div>
            <BookmankrButton />
            <div>  <Clipboard size={DefaultIconSize} /></div>
        <ArrayDivider direction="horizontal"/>
        <DoUnDoComponent />
      </div>
    </>
  );
}

export default ToolsMenue;
