import { useRef, useState } from "react";
import { Canvas } from "./services/CanvasService";
import {
  Circle,
  Eraser,
  Home,
  MousePointer2,
  PenLine,
  Square,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { ZoomedEvent } from "pixi-viewport/dist/types";
import { ZoomSensitivity } from "./CanvasConstants";
import { ColorPicker } from "primereact/colorpicker";
import useCanvasStore from "./CanvasStore";
import { throttle } from 'lodash';

function CanvasPage() {
  const divContainer = useRef<HTMLDivElement>(null);
  const color = useCanvasStore((state) => state.color);
  const zoome = useCanvasStore((state) => state.zoome);
  const setPencileColor = useCanvasStore((state) => state.setPencileColor);

  async function SetUpPixi() {
    const app = await Canvas.getPixiApp();
    if (divContainer.current) {
      divContainer.current.appendChild(app.canvas);
    }
}
function SetColor(color: string){
  setPencileColor("#"+color);
}
  SetUpPixi();
  return (
    <div className="relative h-screen w-screen">
      <div ref={divContainer} className="absolute inset-0" />

      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2">
        <div className="flex justify-center items-center gap-4  bg-white/10 backdrop-blur-sm rounded-lg p-2  min-w-min">
          <ColorPicker value={color} format="hex"  onChange={(e) => SetColor(e.value as string)} />
          <MousePointer2 color="white" size={32} />
          <PenLine color={color} size={32} className="transform" />
          <Eraser color="white" size={32} />
          <Square color="white" size={32} />
          <Circle color="white" size={32} />
        </div>
      </div>
      <div className="absolute left-0 bottom-0  p-4 flex justify-center">
        <div className="rounded-2xl p-2 bg-white/10 backdrop-blur-sm hover:outline-2 outline-amber-300 shadow-2xl transition-all duration-100">
          <Home color="white" size={30} />
        </div>
      </div>
      <div className="absolute right-0 bottom-0 p-2">
        <div className="flex justify-center items-center rounded-2xl p-2 gap-2 bg-white/10 backdrop-blur-sm text-gray-300 text-xl">
            <ZoomIn size={25} onClick={() => Canvas.zoom(1)} />
          {(zoome * 100).toFixed(1)}%
            <ZoomOut size={25} onClick={() =>Canvas.zoom(-1)} />
        </div>
      </div>
    </div>
  );
}

export default CanvasPage;
