import type { JSX } from "react";
import { Direction } from "../../../data/store/LayoutStore";
import useToolStore from "../../../data/store/ToolStore";
import CurveToolOptions from "../curveComponents/CurveToolOptionsBarrel";
import EraseToolOptions from "../eraseComponents/EraseToolOptions";
import {
  DefaultButtonsBackground,
  DefaultToolBarHeight,
  DefaultToolBarPadding,
  DefaultToolBarVPadding,
} from "../../../data/constants/CanvasConstants";
import SelectoinToolOptions from "../selectonComponents/SelectoinToolOptions";
import ShapeToolOptions from "../shapesComponents/ShapeToolOptions";
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
      activeToolComponent = <SelectoinToolOptions />;
      break;
    case "eraser":
      activeToolComponent = <EraseToolOptions />;
      break;
    case "shape":
      activeToolComponent = <ShapeToolOptions />;
      break;
    default:
      activeToolComponent = null;
  }

  return (
    <>
      {canvasStore.advanceToolsActive && advanceSettingsComponent && (
        <div
          className={`${DefaultButtonsBackground} rounded-lg min-w-[20vw]  min-h-[20vw] pointer-events-auto `}
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
