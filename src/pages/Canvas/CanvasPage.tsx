import { useRef } from "react";
import { Canvas } from "./services/CanvasService";
import {
  Circle,
  Eraser,
  Home,
  MousePointer2,
  PenLine,
  Redo,
  Settings,
  Square,
  Undo,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { ColorPicker } from "primereact/colorpicker";
import useCanvasStore from "./data/CanvasStore";
import CircleColorPicker from "./components/CircleColorPicker";
import SettingsDialog from "./components/SettingComponent";

function CanvasPage() {
  const divContainer = useRef<HTMLDivElement>(null);
  const color = useCanvasStore((state) => state.color);
  const zoome = useCanvasStore((state) => state.zoome);

  const setPencileColor = useCanvasStore((state) => state.setPencileColor);
  const setSettingVisible = useCanvasStore((state) => state.setSettingVisible);

  async function SetUpPixi() {
    const app = await Canvas.getPixiApp();
    if (divContainer.current) {
      divContainer.current.appendChild(app.canvas);
    }
  }
  function SetColor(color: string) {
    setPencileColor("#" + color);
  }

  SetUpPixi();
  return (
    <div className="relative h-screen w-screen">
      <div ref={divContainer} className="absolute inset-0" />
      <div className="absolute right-0 h-full flex justify-center items-center pr-2">
        <div className="flex flex-col justify-center items-center gap-4  bg-white/10 backdrop-blur-sm rounded-lg p-2  min-w-min">
          <CircleColorPicker color="blue" selected={true}></CircleColorPicker>
          <CircleColorPicker color="red" selected={false}></CircleColorPicker>
          <ColorPicker
            format="hex"
            onChange={(e) => SetColor(e.value as string)}
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2">
        <div className="flex justify-center items-center gap-4   bg-white/10 backdrop-blur-sm rounded-l-2xl p-2  min-w-min">
          <MousePointer2
            color="white"
            size={32}
            className="hover:scale-110 hover:-translate-y-3 transition-all duration-200 cursor-pointer"
          />
          <PenLine
            color={color}
            size={32}
            className="hover:scale-110 hover:-translate-y-3 transition-all duration-200 cursor-pointer"
          />
          <Eraser
            color="white"
            size={32}
            className="hover:scale-110 hover:-translate-y-3 transition-all duration-200 cursor-pointer"
          />
          <Square
            color="white"
            size={32}
            className="hover:scale-110 hover:-translate-y-3 transition-all duration-200 cursor-pointer"
          />
          <Circle
            color="white"
            size={32}
            className="hover:scale-110 hover:-translate-y-3 transition-all duration-200 cursor-pointer"
          />
        </div>
        <div className="flex justify-center items-center gap-4  bg-white/10 backdrop-blur-sm rounded-r-2xl border-l-2 border-gray-700 p-2  min-w-min">
          <Undo color="white" size={32} className="hover:cursor-pointer" />
          <Redo color="white" size={32} className="hover:cursor-pointer" />
        </div>
      </div>
      <div className="absolute left-0 bottom-0  p-2 flex justify-center">
        <div className="rounded-2xl p-2 bg-white/10 backdrop-blur-sm hover:outline-2 flex  gap-4">
          <Home color="white" size={30} className="hover:cursor-pointer" />
          <Settings
            color="white"
            size={30}
            className="hover:cursor-pointer"
            onClick={() =>{setSettingVisible(true);}}
          />
          <SettingsDialog></SettingsDialog>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 p-2">
        <div className="flex justify-center items-center rounded-2xl p-2 gap-2 bg-white/10 backdrop-blur-sm text-gray-300 text-xl">
          <ZoomIn
            className="hover:cursor-pointer"
            size={25}
            onClick={() => Canvas.zoom(1)}
          />
          {(zoome * 100).toFixed(1)}%
          <ZoomOut
            className="hover:cursor-pointer"
            size={25}
            onClick={() => Canvas.zoom(-1)}
          />
        </div>
      </div>
    </div>
  );
}

export default CanvasPage;
