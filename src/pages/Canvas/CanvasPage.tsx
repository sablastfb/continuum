import { useEffect, useRef } from "react";
import { Continuum_Canvas } from "./features/CanvasApp";
import useCanvasStore from "./data/store/CanvasStore";
import BarrelDialogs from "./components/dialog/BarrelDialogs";
import BarrelEffect from "./components/effects/BarrelEffect";
import ToolLayout from "./components/tools/toolBoxes/ToolLayout";

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
    <div className=" h-screen w-screen">
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
      <BarrelDialogs/>
      <BarrelEffect />
    </div>
  );
}

export default CanvasPage;
