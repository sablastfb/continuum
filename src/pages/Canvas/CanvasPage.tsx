import { useEffect, useRef } from "react";
import ToolLayout from "./components/tools/HeaderToolMenue/ToolLayout";
import { Continuum_Canvas } from "./features/CanvasApp";
import CursorEffect from "./components/effects/CursorEffect";
import BackgroundEffect from "./components/effects/BackgroundEffect";
import useCanvasStore from "./data/store/CanvasStore";
import CanvasDialogs from "./components/dialog/CanvasDialogs";
import CanvasEffect from "./components/effects/CanvasEffect";

function CanvasPage() {
  const canvasContainer = useRef<HTMLDivElement>(null);
  const setCanvasCursorActive = useCanvasStore(
    (state) => state.setCanvasCursorActive
  );

  useEffect(() => {
    document.documentElement.classList.add("dark");

    async function SetUpPixi() {
      const app = await Continuum_Canvas.creatPixiApp();
      if (canvasContainer?.current && app && app?.canvas !== undefined) {
        canvasContainer.current.appendChild(app?.canvas);
      }
    }
    SetUpPixi();
  }, []);

  return (
    <div className="relative h-screen w-screen">
      <div
        onMouseEnter={() => {
          setCanvasCursorActive(true);
        }}
        onMouseLeave={() => {
          setCanvasCursorActive(false);
        }}
      >
        <div
          ref={canvasContainer}
          className="absolute inset-0"
          style={{ cursor: "none" }}
        />
      </div>

      <ToolLayout />
      <CanvasDialogs/>
      <CanvasEffect />
    </div>
  );
}

export default CanvasPage;
