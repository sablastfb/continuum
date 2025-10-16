import {
  DefaultButtonsBackground,
  DefaultToolBarHeight,
  DefaultToolBarPadding,
  DefaultToolBarVPadding,
} from "../../data/constants/CanvasConstants";
import { Direction } from "../../data/store/LayoutStore";
import CurveToolOptions from "../tools/curveComponents/CurveToolOptionsBarrel";
import EraseTools from "../tools/eraseComponents/EraseTools";
import useToolStore from "../../data/store/ToolStore";
import type { JSX } from "react";

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
    case "eraser":
      activeToolComponent = <EraseTools />;
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
