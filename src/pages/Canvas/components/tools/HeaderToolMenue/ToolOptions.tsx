import { defaultButtonsBackground } from "../../../data/constants/CanvasConstants";
import useCanvasStore from "../../../data/store/CanvasStore";
import useSettingsStore from "../../../data/store/SettingsStore";
import ShapeTool from "../ToolOptions/CircleTool";
import EraseTools from "../ToolOptions/EraseTools";
import MarkerTools from "../ToolOptions/MarkerTool";
import PencileTools from "../ToolOptions/PencileTools";

function ToolOptions() {
  const activeTool = useCanvasStore((state) => state.activeTool);
  const toolButtons = useSettingsStore().layout.toolButtons;

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
      activeToolComponent = <ShapeTool shapeType={'square'} />;
      break;
    case "circle":
      activeToolComponent = <ShapeTool shapeType={'circle'} />;
      break;
    case "hexagon":
      activeToolComponent = <ShapeTool shapeType={'hexagon'} />;
      break;
    default:
      activeToolComponent = <></>;
  }

  return (
    <>
      <div
        className={`absolute  flex items-center p-2 pointer-events-none 
      ${toolButtons === "left" && "h-full"}
      ${toolButtons === "right" && "h-full w-full flex-row-reverse"}
      ${toolButtons === "top" && "flex-col"}
      `}
      >
        <div
          className={`${defaultButtonsBackground} flex  items-center gap-4 rounded-lg p-1 pointer-events-auto
         ${toolButtons === "left" && "flex-col"}
         ${toolButtons === "right" && "flex-col justify-end"}
          ${toolButtons === "bottom" && ""}
          ${toolButtons === "bottom" && ""}
          `}
        >
          {activeToolComponent}
        </div>
      </div>
    </>
  );
}

export default ToolOptions;
