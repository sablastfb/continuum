import { useEffect, useRef } from "react";
import ToolsMenue from "./components/tools/ToolsMenue";
import SettingsDialog from "./components/dialog/SettingsDialog";
import PencileTools from "./components/tools/PencileTools";
import ExportDialog from "./components/dialog/ExportDialog";
import InfoDialog from "./components/dialog/InfoDialog";
import useCanvasStore from "./data/CanvasStore";
import TransformTools from "./components/tools/TransportComponent";
import EraseTools from "./components/tools/EraseTools";
import CircleTool from "./components/tools/CircleTool";
import SquareTool from "./components/tools/SquareTool";
import TextTool from "./components/tools/TextTool";
import { Canvas } from "./features/services/CanvasService";

function CanvasPage() {
  const canvasContainer = useRef<HTMLDivElement>(null);
  const activeTool = useCanvasStore((state) => state.activeTool);

  useEffect(() => {
  async function SetUpPixi() {
    const app = await Canvas.getPixiApp();
    if (canvasContainer.current && app) {
      canvasContainer.current.appendChild(app.canvas);
    }
  }
  SetUpPixi();

  }, []);


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
    <div className="relative h-screen w-screen">
      <div ref={canvasContainer} className="absolute inset-0" 
      />
      {activeToolComponent}
      <ToolsMenue />
      <SettingsDialog />
      <ExportDialog />
      <InfoDialog />
    </div>
  );
}

export default CanvasPage;
