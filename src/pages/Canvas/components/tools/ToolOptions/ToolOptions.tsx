import { defaultButtonsBackground } from "../../../data/constants/CanvasConstants";
import useCanvasStore from "../../../data/store/CanvasStore";
import ShapeTool from "./ShapeTool";
import EraseTools from "./EraseTools";
import MarkerTools from "./MarkerTool";
import PencileTools from "./PencileTools";

function ToolOptions() {
  const activeTool = useCanvasStore((state) => state.activeTool);

  let activeToolComponent;
  switch (activeTool) {
    case "pencile":
      activeToolComponent = <PencileTools />;
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
        className={`${defaultButtonsBackground} flex  items-center gap-4 rounded-lg p-1 pointer-events-auto `}
      >
        {activeToolComponent}
      </div>
    </>
  );
}

export default ToolOptions;
