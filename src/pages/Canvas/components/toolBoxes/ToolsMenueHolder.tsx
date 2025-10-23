import { Clipboard, Image, Type, Link, Ruler } from "lucide-react";
import DoUnDoComponent from "./DoUnDoComponent";
import { Direction } from "../../data/store/LayoutStore";
import {
  DefaultButtonsBackground,
  DefaultIconSize,
  DefaultToolBarHeight,
  DefaultToolBarPadding,
  DefaultToolBarVPadding,
  DefaultToolBarWith,
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
            ${
              direction === "vertical"
                ? `  max-h-[50%] h-200 `
                : ` max-w-[75%] w-fit `
            }
          `}
        >
          <ScrollableContainer direction={direction}>
            <div
              className={`
                flex items-center gap-4 
                ${
                  direction === "vertical"
                    ? ` flex-col  py-1  ${DefaultToolBarWith}  `
                    : ` flex-row ${DefaultToolBarHeight} px-1 `
                }
              `}
            >
              <CurveToolMenue />
              <SelectionToolMenue />
              <EraserToolMenue />
              <ShapeToolMenue />
              <div>
                <Type size={DefaultIconSize} />
              </div>
              <div>
                <Image size={DefaultIconSize} />
              </div>
              <div>
                <Ruler size={DefaultIconSize} />
              </div>
              <div>
                <Link size={DefaultIconSize} />
              </div>
              <BookmankrButton />
              <div>
                <Clipboard size={DefaultIconSize} />
              </div>
              <ArrayDivider direction={direction} />
              <DoUnDoComponent />
            </div>
          </ScrollableContainer>
        </div>
      )}
    </>
  );
};

export default ToolsMenueHolder;
