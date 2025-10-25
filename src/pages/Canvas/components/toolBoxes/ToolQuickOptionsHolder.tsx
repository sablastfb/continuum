import type { JSX } from "react";
import { Direction } from "../../data/store/LayoutStore";
import useCanvasStore from "../../data/store/CanvasStore";
import useToolStore from "../../data/store/ToolStore";
import CurveToolOptions from "../tools/curveComponents/CurveToolOptionsBarrel";
import CurveAdvanceSettings from "../tools/curveComponents/CurveAdvanceSettings";
import SelectoinToolQuickOptions from "../tools/selectonComponents/SelectoinToolQuickOptions";
import EraseToolQuickOptions from "../tools/eraseComponents/EraseToolQuickOptions";
import ShapeToolQuickOptions from "../tools/shapesComponents/ShapeToolQuickOptions";
import {
  DefaultButtonsBackground,
  DefaultToolBarHeight,
  DefaultToolBarPadding,
  DefaultToolBarVPadding,
} from "../../data/types/CanvasConstants";
import ScrollableContainer from "./ScrollableContainer";

export interface ToolOptionParameters {
  direction: Direction;
}

const ToolOptionsHolder = ({ direction: direction }: ToolOptionParameters) => {
  const canvasStore = useCanvasStore();
  const activeTool = useToolStore((state) => state.activeTool);

  let activeToolComponent: JSX.Element | null = null;
  let advanceSettingsComponent: JSX.Element | null = null;
  switch (activeTool) {
    case "pen":
    case "highlighter":
      activeToolComponent = <CurveToolOptions />;
      advanceSettingsComponent = <CurveAdvanceSettings />;
      break;
    case "pan-zoom":
    case "selection-lasso":
    case "selection-square":
    case "screen-shot":
      activeToolComponent = <SelectoinToolQuickOptions />;
      break;
    case "eraser":
      activeToolComponent = <EraseToolQuickOptions />;
      break;
    case "shape":
      activeToolComponent = <ShapeToolQuickOptions />;
      break;
    default:
      activeToolComponent = null;
  }

  return (
    <>
      {advanceSettingsComponent && (
        <div
          className={`${DefaultButtonsBackground} rounded-lg min-w-[max(20vw,300px)] min-h-[max(20vw,300px)] pointer-events-auto overflow-hidden 
              transition-all duration-300 ease-in-out origin-center
              ${
                canvasStore.advanceToolsActive
                  ? "scale-100 opacity-100"
                  : "scale-0 opacity-0 pointer-events-none"
              } 
        `}
        >
          {advanceSettingsComponent}
        </div>
      )}
      {canvasStore.editingModOn && activeToolComponent && (
        <ScrollableContainer
          direction={direction}
          className={`
        ${DefaultButtonsBackground} 
        flex items-center gap-4  pointer-events-auto 
        ${
          direction === "vertical" &&
          `flex-col ${DefaultToolBarVPadding}  sm:max-h-[80vh] max-h-[40vh] `
        } 
        ${
          direction === "horizontal" &&
          `${DefaultToolBarHeight} ${DefaultToolBarPadding}  max-w-[80vw]`
        }
        `}
        >
          {activeToolComponent}
        </ScrollableContainer>
      )}
    </>
  );
};

export default ToolOptionsHolder;
