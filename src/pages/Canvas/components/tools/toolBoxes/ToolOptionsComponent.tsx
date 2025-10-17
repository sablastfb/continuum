
import type { JSX } from "react";
import { Direction } from "../../../data/store/LayoutStore";
import useToolStore from "../../../data/store/ToolStore";
import CurveToolOptions from "../curveComponents/CurveToolOptionsBarrel";
import EraseToolOptions from "../eraseComponents/EraseToolOptions";
import { DefaultButtonsBackground, DefaultToolBarHeight, DefaultToolBarPadding, DefaultToolBarVPadding } from "../../../data/constants/CanvasConstants";
import SelectoinToolOptions from "../selectonComponents/SelectoinToolOptions";
import ShapeToolMenue from "../shapesComponents/ShapeToolMenue";
import ShapeToolOptions from "../shapesComponents/ShapeToolOptions";

export interface ToolOptionParameters {
  direction: Direction;
}

function ToolOptions({ direction: directin }: ToolOptionParameters) {
  const activeTool = useToolStore((state) => state.activeTool);

  let activeToolComponent: JSX.Element | null = null;
  switch (activeTool) {
    case "pen":
    case "highlighter":
      activeToolComponent = <CurveToolOptions />;
      break;
    case "pan-zoom":
    case "selection-lasso":
    case "selection-square":
    case "screen-shot":
      activeToolComponent = <SelectoinToolOptions/>
      break;
    case "eraser":
      activeToolComponent = <EraseToolOptions />;
      break;
    case "shape":
      activeToolComponent = <ShapeToolOptions/>
      break;
    default:
      activeToolComponent = null;
  }

  return (
    <>
      {activeToolComponent && (
        <div
          className={`
        ${DefaultButtonsBackground} 
        flex items-center gap-4 rounded-lg  pointer-events-auto 
        ${directin === "vertical" && `flex-col ${DefaultToolBarVPadding}`} 
        ${
          directin === "horizontal" &&
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

export default ToolOptions;
