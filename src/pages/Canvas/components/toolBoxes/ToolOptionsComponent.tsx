import {
  DefaultButtonsBackground,
  DefaultToolBarHeight,
  DefaultToolBarPadding,
  DefaultToolBarVPadding,
} from "../../data/constants/CanvasConstants";
import useCanvasStore from "../../data/store/CanvasStore";
import { Direction } from "../../data/store/LayoutStore";
import CurveToolOptions from "../tools/curveComponents/CurveToolOptionsBarrel";
import EraseTools from "../tools/eraseComponents/EraseTools";
import ShapeTool from "../tools/shapesComponents/ShapeToolOptions";

export interface ToolOptionParameters {
  direction: Direction;
}

function ToolOptions({ direction: directin }: ToolOptionParameters) {
  const activeTool = useCanvasStore((state) => state.activeTool);

  let activeToolComponent;
  switch (activeTool) {
    case "pen":
    case "highlighter":
      activeToolComponent = <CurveToolOptions />;
      break;
    case "eraser":
      activeToolComponent = <EraseTools />;
      break;
    case "square":
      activeToolComponent = <ShapeTool shapeType={"square"} />;
      break;
    case "circle":
      activeToolComponent = <ShapeTool shapeType={"circle"} />;
      break;
    case "hexagon":
      activeToolComponent = <ShapeTool shapeType={"hexagon"} />;
      break;
    default:
      activeToolComponent = <></>;
  }

  return (
    <>
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
    </>
  );
}

export default ToolOptions;
