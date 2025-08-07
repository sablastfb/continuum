import { useRef } from "react";
import { Canvas } from "./services/CanvasService";
import ToolsMenue from "./components/tools/ToolsMenue";
import SettingsDialog from "./components/dialog/SettingsDialog";
import PencileTools from "./components/tools/PencileTools";
import ExportDialog from "./components/dialog/ExportDialog";
import InfoDialog from "./components/dialog/InfoDialog";
import useCanvasStore from "./data/CanvasStore";
import TransformTools from "./components/tools/TransportComponent";
import EraseTools from "./components/tools/EraseTools";

function CanvasPage() {
  const divContainer = useRef<HTMLDivElement>(null);
  const activeTool = useCanvasStore((state) => state.activeTool);

  async function SetUpPixi() {
    const app = await Canvas.getPixiApp();
    if (divContainer.current) {
      divContainer.current.appendChild(app.canvas);
    }
  }
  let activeToolComponent;
    switch(activeTool) {
    case 'drawing':
      activeToolComponent = <PencileTools />;
      break;
    case 'eraser':
      activeToolComponent = <EraseTools />;
    break;
    case 'transform':
      activeToolComponent = <TransformTools />;
      break;
  }


  SetUpPixi();
  return (
    <div className="relative h-screen w-screen">
    <div ref={divContainer} className="absolute inset-0" />
    { activeToolComponent }
    <ToolsMenue/>
    <SettingsDialog />
    <ExportDialog />
    <InfoDialog />
    </div>
  );
}

export default CanvasPage;
