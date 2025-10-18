import type { JSX } from "react";
import { Direction } from "../../data/store/LayoutStore";
import useCanvasStore from "../../data/store/CanvasStore";
import useToolStore from "../../data/store/ToolStore";
import CurveToolOptions from "../tools/curveComponents/CurveToolOptionsBarrel";
import CurveAdvanceSettings from "../tools/curveComponents/CurveAdvanceSettings";
import SelectoinToolOptions from "../tools/selectonComponents/SelectoinToolOptions";
import EraseToolOptions from "../tools/eraseComponents/EraseToolOptions";
import ShapeToolOptions from "../tools/shapesComponents/ShapeToolOptions";
import { DefaultButtonsBackground, DefaultToolBarHeight, DefaultToolBarPadding, DefaultToolBarVPadding } from "../../data/types/CanvasConstants";


export interface ToolOptionParameters {
  direction: Direction;
}

function ToolOptionsHolder({ direction: direction }: ToolOptionParameters) {
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

export default ToolOptionsHolder;
