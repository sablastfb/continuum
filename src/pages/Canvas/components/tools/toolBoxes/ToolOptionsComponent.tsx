import type { JSX } from "react";
import { Direction } from "../../../data/store/LayoutStore";
import useToolStore from "../../../data/store/ToolStore";
import CurveToolOptions from "../curveComponents/CurveToolOptionsBarrel";
import EraseToolQuickOptions from "../eraseComponents/EraseToolQuickOptions";
import {
  DefaultButtonsBackground,
  DefaultToolBarHeight,
  DefaultToolBarPadding,
  DefaultToolBarVPadding,
} from "../../../data/types/CanvasConstants";
import SelectoinToolQuickOptions from "../selectonComponents/SelectoinToolQuickOptions";
import ShapeToolQuickOptions from "../shapesComponents/ShapeToolQuickOptions";
import useCanvasStore from "../../../data/store/CanvasStore";
import CurveAdvanceSettings from "../curveComponents/CurveAdvanceSettings";

export interface ToolOptionParameters {
  direction: Direction;
}

function ToolOptionsComponent({ direction: direction }: ToolOptionParameters) {
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
      {canvasStore.advanceToolsActive && advanceSettingsComponent && (
        <div
          tabIndex={0} // This makes the div focusable
          className={`${DefaultButtonsBackground} rounded-lg min-w-[20vw] min-h-[20vw] pointer-events-auto`}
          onBlur={() => canvasStore.setAdvanceToolsVisibility(false)}
        >
          {advanceSettingsComponent}
        </div>
      )}
      {activeToolComponent && (
        <div
          className={`
        ${DefaultButtonsBackground} 
        flex items-center gap-4 rounded-lg  pointer-events-auto 
        ${direction === "vertical" && `flex-col ${DefaultToolBarVPadding}`} 
        ${
          direction === "horizontal" &&
          `${DefaultToolBarHeight} ${DefaultToolBarPadding}`
        }
        `}
        >
          {activeToolComponent}
        </div>
      )}
    </>
  );
}

export default ToolOptionsComponent;
