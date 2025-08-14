import useCanvasStore from "../../data/store/CanvasStore";
import CircleTool from "./CircleTool";
import EraseTools from "./EraseTools";
import PencileTools from "./PencileTools";
import SquareTool from "./SquareTool";
import TextTool from "./TextTool";
import TransformTools from "./TransportComponent";

function Tool() {
  const activeTool = useCanvasStore((state) => state.activeTool);
  const toolButtons = useCanvasStore().canvasSettings.layout.toolButtons;

  let activeToolComponent;
  switch (activeTool) {
    case "drawing":
      activeToolComponent = <PencileTools />;
      break;
    case "eraser":
      activeToolComponent = <EraseTools />;
      break;
    case "move":
      activeToolComponent = <></>;
      break;
    case "transform":
      activeToolComponent = <TransformTools />;
      break;
    case "circle":
      activeToolComponent = <CircleTool />;
      break;
    case "square":
      activeToolComponent = <SquareTool />;
      break;
    case "text":
      activeToolComponent = <TextTool />;
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
          className={`flex  items-center gap-4  bg-white/10 backdrop-blur-sm rounded-lg p-1 pointer-events-auto
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

export default Tool;
