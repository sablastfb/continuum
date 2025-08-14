import useCanvasStore from "../../data/store/CanvasStore";
import CircleTool from "./CircleTool";
import EraseTools from "./EraseTools";
import PencileTools from "./PencileTools";
import SquareTool from "./SquareTool";
import TextTool from "./TextTool";
import TransformTools from "./TransportComponent";

function Tool() {
  const activeTool = useCanvasStore((state) => state.activeTool);
  const toolMenue = useCanvasStore().canvasSettings.layout.toolMenue;

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
      <div className="h-full flex justify-center items-center pr-2 pointer-events-none">
        {activeToolComponent}
      </div>
    </>
  );
}

export default Tool;
