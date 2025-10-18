import { Clipboard, Image, Type, Link, Ruler } from "lucide-react";
import DoUnDoComponent from "./DoUnDoComponent";
import { Direction } from "../../data/store/LayoutStore";
import { DefaultButtonsBackground, DefaultIconSize, DefaultToolBarHeight, DefaultToolBarPadding, DefaultToolBarVPadding } from "../../data/constants/CanvasConstants";
import CurveToolMenue from "../tools/curveComponents/CurveToolMenue";
import SelectionToolMenue from "../tools/selectonComponents/SelectionToolMenue";
import EraserToolMenue from "../tools/eraseComponents/EraserToolMenue";
import ShapeToolMenue from "../tools/shapesComponents/ShapeToolMenue";
import BookmankrButton from "../tools/bookmarkComponents/BookmankrButton";
import ArrayDivider from "../misc/ArrayDivider";

export interface ToolsMenueParameter {
  direction: Direction;
}

function ToolsMenue({ direction }: ToolsMenueParameter) {
  // PART FOR SCROLLING
  // const scrollContainerRef = useRef<HTMLDivElement>(null);
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
        className={`
             ${DefaultButtonsBackground} 
             flex items-center gap-4 rounded-lg  pointer-events-auto 
             ${
               direction === "vertical" && `flex-col ${DefaultToolBarVPadding}`
             } 
             ${
               direction === "horizontal" &&
               `${DefaultToolBarHeight} ${DefaultToolBarPadding}`
             }
             `}
      >
        <CurveToolMenue />
        <SelectionToolMenue />
        <EraserToolMenue />
        <ShapeToolMenue />
        <div>
          {" "}
          <Type size={DefaultIconSize} />
        </div>

        <div>
          {" "}
          <Image size={DefaultIconSize} />
        </div>
        <div>
          {" "}
          <Ruler size={DefaultIconSize} />
        </div>
        <div>
          {" "}
          <Link size={DefaultIconSize} />
        </div>
        <BookmankrButton />
        <div>
          {" "}
          <Clipboard size={DefaultIconSize} />
        </div>
        <ArrayDivider direction={direction} />
        <DoUnDoComponent />
      </div>
    </>
  );
}

export default ToolsMenue;
