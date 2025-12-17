import { useEffect } from "react";
import useCanvasStore from "../../data/store/CanvasStore";
import useBackgroundStore from "../../data/store/BackgroundStore.ts";
import { useCurveStore } from "../../data/store/PenStore";
import { useEraseStore } from "../../data/store/EraseStore";
import { Continuum_Canvas } from "../../features/CanvasApp";

const CursorEffect = () => {
  const zoom = useCanvasStore().zoom;
  const color = useBackgroundStore((state) => state);
  const canvasCursorActive = useCanvasStore(
    (state) => state.canvasCursorActive
  );
  const pen = useCurveStore();
  const eraser = useEraseStore();

  useEffect(() => {
     Continuum_Canvas.cursorManager.updateCursorGraphics();
  }, [color, zoom, pen, eraser]);

  useEffect(() => {
     Continuum_Canvas.cursorManager.updateCursorVisibility(canvasCursorActive);
  }, [canvasCursorActive]);

  return <></>;
}

export default CursorEffect;
