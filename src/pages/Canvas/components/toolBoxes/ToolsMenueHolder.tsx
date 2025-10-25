import DoUnDoComponent from "./DoUnDoComponent";
import { Direction } from "../../data/store/LayoutStore";
import {
  DefaultButtonsBackground,
  DefaultToolBarHeight,
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
        <ScrollableContainer
          direction={direction}
          className={`
            ${DefaultButtonsBackground} 
            pointer-events-auto 
             flex items-center gap-4
               ${
                 direction === "vertical"
                   ? `flex-col py-1 ${DefaultToolBarWith} max-h-[75vh] `
                   : `flex-row px-1 ${DefaultToolBarHeight}  max-w-[75vw] `
               }

          `}
        >
          <CurveToolMenue />
          <SelectionToolMenue />
          <EraserToolMenue />
          <ShapeToolMenue />
          <BookmankrButton />
           <ArrayDivider direction={direction} />
          <DoUnDoComponent />
        </ScrollableContainer>
      )}
    </>
  );
};

export default ToolsMenueHolder;
