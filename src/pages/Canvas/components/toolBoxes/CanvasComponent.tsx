import {  useLayoutEffect, useRef } from "react";
import useCanvasStore from "../../data/store/CanvasStore";
import { Continuum_Canvas } from "../../features/CanvasApp";

const PixiCanvasComponent = () => {
  const canvasContainer = useRef<HTMLDivElement>(null);

  const setCanvasCursorActive = useCanvasStore(
    (state) => state.setCanvasCursorActive
  );

  useLayoutEffect(() => {
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
    <>
      <div
         style={{ cursor: "none" }}
        ref={canvasContainer}
        className="h-full w-full flex-1 "
        onMouseEnter={() => {
          setCanvasCursorActive(true);
        }}
        onMouseLeave={() => {
          setCanvasCursorActive(false);
        }}
      >
      </div>
    </>
  );
};

export default PixiCanvasComponent;
