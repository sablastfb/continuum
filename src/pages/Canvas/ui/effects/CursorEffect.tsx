import { useEffect } from "react";
import useCanvasStore from "../../data/store/CanvasStore";
import useBacgroundStore from "../../data/store/BacgroundStore";
import { useCurveStore } from "../../data/store/PenStore";
import { useEraseStore } from "../../data/store/EraseStore";
import { Continuum_Canvas } from "../../features/CanvasApp";

const CursorEffect = () => {
  const zoom = useCanvasStore().zoome;
  const color = useBacgroundStore((state) => state);
  const canvasCursorActive = useCanvasStore(
    (state) => state.canvasCursorActive
  );
  const pen = useCurveStore();
  const eraser = useEraseStore();

  useEffect(() => {
     Continuum_Canvas.cursorManager.updateCursorGraphics();
  }, [color, zoom, pen, eraser]);

  useEffect(() => {
     Continuum_Canvas.cursorManager.updateCursorVisibilty(canvasCursorActive);
  }, [canvasCursorActive]);

  return <></>;
}

export default CursorEffect;
