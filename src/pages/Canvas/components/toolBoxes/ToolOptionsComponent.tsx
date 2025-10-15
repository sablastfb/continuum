import {
  DefaultButtonsBackground,
  DefaultToolBarHeight,
  DefaultToolBarPadding,
  DefaultToolBarVPadding,
} from "../../data/constants/CanvasConstants";
import useCanvasStore from "../../data/store/CanvasStore";
import MarkerTools from "../curveComponents/MarkerOptionsTool";
import { Direction } from "../../data/store/LayoutStore";
import PenToolOptions from "../curveComponents/PenToolsOptions";
import EraseTools from "../eraseComponents/EraseTools";
import ShapeTool from "../shapesComponents/ShapeToolOptions";

export interface ToolOptionParameters {
  direction: Direction;
}

function ToolOptions({ direction: directin }: ToolOptionParameters) {
  const activeTool = useCanvasStore((state) => state.activeTool);

  let activeToolComponent;
  switch (activeTool) {
    case "pencile":
      activeToolComponent = <PenToolOptions />;
      break;
    case "eraser":
      activeToolComponent = <EraseTools />;
      break;
    case "marker":
      activeToolComponent = <MarkerTools />;
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
        flex  ${
          directin === "vertical" && `flex-col ${DefaultToolBarVPadding}` 
        } 
        ${
          directin === 'horizontal' && `${DefaultToolBarHeight} ${DefaultToolBarPadding}`
        }
        
        items-center gap-4 rounded-lg  pointer-events-auto 
        `}
      >
        {activeToolComponent}
      </div>
    </>
  );
}

export default ToolOptions;
