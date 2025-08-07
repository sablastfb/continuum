import { useRef } from "react";
import { Canvas } from "./services/CanvasService";
import { ColorPicker } from "primereact/colorpicker";
import useCanvasStore from "./data/CanvasStore";
import CircleColorPicker from "./components/CircleColorPicker";
import ToolsMenue from "./components/tools/ToolsMenue";
import SettingsDialog from "./components/dialog/SettingsDialog";
import PencileTools from "./components/tools/PencileTools";
import ExportDialog from "./components/dialog/ExportDialog";
import InfoDialog from "./components/dialog/InfoDialog";

function CanvasPage() {
  const divContainer = useRef<HTMLDivElement>(null);

  async function SetUpPixi() {
    const app = await Canvas.getPixiApp();
    if (divContainer.current) {
      divContainer.current.appendChild(app.canvas);
    }
  }

  SetUpPixi();
  return (
    <div className="relative h-screen w-screen">
      <div ref={divContainer} className="absolute inset-0" />
    <PencileTools/>
    <ToolsMenue/>
    <SettingsDialog />
    <ExportDialog />
    <InfoDialog />
    </div>
  );
}

export default CanvasPage;
