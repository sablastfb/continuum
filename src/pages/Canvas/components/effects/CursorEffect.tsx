import { useEffect } from "react";
import useCanvasStore from "../../data/store/CanvasStore";
import useSettingsStore from "../../data/store/BacgroundStore";
import { usePenStore } from "../../data/store/PenStore";
import { Continuum_CanvasCursor } from "../../features/cursor/CursorManager";
import { useEraseStore } from "../../data/store/EraseStore";

function CursorEffect() {
  const zoom = useCanvasStore().zoome;
  const color = useSettingsStore((state) => state);
  const canvasCursorActive = useCanvasStore(
    (state) => state.canvasCursorActive
  );
  const pen = usePenStore();
  const eraser = useEraseStore();

  useEffect(() => {
    Continuum_CanvasCursor.updateCursor();
  }, [color, zoom, pen, eraser]);

  useEffect(() => {
    Continuum_CanvasCursor.updateCursorVisibilty(canvasCursorActive);
  }, [canvasCursorActive]);

  return <></>;
}

export default CursorEffect;
