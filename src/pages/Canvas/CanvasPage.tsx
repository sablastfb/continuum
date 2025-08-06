import { Viewport } from "pixi-viewport";
import { Application, Graphics } from "pixi.js";
import { Button } from "primereact/button";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Canvas } from "./services/pixi-app";
import {
  Circle,
  Eraser,
  MousePointer2,
  MoveLeft,
  PenLine,
  Square,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { ZoomedEvent } from "pixi-viewport/dist/types";

function CanvasPage() {
  const divContainer = useRef<HTMLDivElement>(null);
  const [colorHEX, setColorHEX] = useState("#6466f1"); // Added '#' for proper HEX format
  const [zoomed, setZoomed] = useState(1);
  async function SetUpPixi() {
    const app = await Canvas.getPixiApp();
    if (divContainer.current) {
      divContainer.current.appendChild(app.canvas);
    }

    const viewport = Canvas.getViewport();
    viewport.on("zoomed", (e: ZoomedEvent) => {
      setZoomed(viewport?.scale.x);
    });
  }
  SetUpPixi();

  return (
    <div className="relative h-screen w-screen">
      <div ref={divContainer} className="absolute inset-0" />

      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2">
        <div className="flex justify-center items-center gap-4  bg-white/10 backdrop-blur-sm rounded-lg p-2  min-w-min">
          <MousePointer2 color="white" size={32} />
          <PenLine color="white" size={32} className="transform" />
          <Eraser color="white" size={32} />
          <Square color="white" size={32} />
          <Circle color="white" size={32} />
        </div>
      </div>
      <div className="absolute left-0  p-4 flex justify-center">
        <div className="rounded-2xl p-2 bg-white/10 backdrop-blur-sm hover:outline-2 outline-amber-300 shadow-2xl transition-all duration-100">
          <MoveLeft color="white" size={30} />
        </div>
      </div>
      <div className="absolute right-0 bottom-0 p-2">
        <div className="flex justify-center items-center rounded-2xl p-2 gap-2 bg-white/10 backdrop-blur-sm text-gray-300 text-xl">
              <ZoomIn size={25}/>
            {(zoomed * 100).toFixed(1)}%
              <ZoomOut size={25}/>
        </div>
      </div>
    </div>
  );
}

export default CanvasPage;
