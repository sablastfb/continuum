import { Clipboard, Image, Type, Link, Ruler } from "lucide-react";
import DoUnDoComponent from "./DoUnDoComponent";
import { Direction } from "../../data/store/LayoutStore";
import {
  DefaultButtonsBackground,
  DefaultIconSize,
  DefaultToolBarHeight,
  DefaultToolBarPadding,
  DefaultToolBarVPadding,
} from "../../data/types/CanvasConstants";
import CurveToolMenue from "../tools/curveComponents/CurveToolMenue";
import SelectionToolMenue from "../tools/selectonComponents/SelectionToolMenue";
import EraserToolMenue from "../tools/eraseComponents/EraserToolMenue";
import ShapeToolMenue from "../tools/shapesComponents/ShapeToolMenue";
import BookmankrButton from "../tools/bookmarkComponents/BookmankrButton";
import ArrayDivider from "../misc/ArrayDivider";
import useCanvasStore from "../../data/store/CanvasStore";
import ScrollableContainer from "./ScrollableContainer";

export interface ToolsMenueParameter {
  direction: Direction;
}

const ToolsMenueHolder = ({ direction }: ToolsMenueParameter) => {
  const canvasStore = useCanvasStore();

  return (
    <>
      {canvasStore.editingModOn && (
        <div
          className={`
            ${DefaultButtonsBackground} 
            rounded-lg pointer-events-auto 
            ${direction === "vertical" ? DefaultToolBarVPadding : DefaultToolBarPadding}
            ${direction === "vertical" ? "  max-h-[20%] h-fit " : " max-w-[75%] w-fit"}
          `}
        >
          <ScrollableContainer  direction={direction} >
            <div
              className={`
                flex items-center gap-4 
                ${direction === "vertical" ? " flex-col  py-1 w-11  " : `flex-row ${DefaultToolBarHeight} px-1 h-11`}
              `}
            >
              <CurveToolMenue />
              <SelectionToolMenue />
              <EraserToolMenue />
              <ShapeToolMenue />
              <Type size={DefaultIconSize} />
              <Image size={DefaultIconSize} />
              <Ruler size={DefaultIconSize} />
              <Link size={DefaultIconSize} />
              <BookmankrButton />
              <Clipboard size={DefaultIconSize} />
              <ArrayDivider direction={direction} />
              <DoUnDoComponent />
            </div>
          </ScrollableContainer >
        </div>
      )}
    </>
  );
};

export default ToolsMenueHolder;