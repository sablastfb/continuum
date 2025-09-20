import { CanvasPalet } from "../../data/container/PaletContainer";
import { ThicknesPalet } from "../../data/container/ThickneContainer";
import useCanvasStore from "../../data/store/CanvasStore";
import { useEraseStore } from "../../data/store/EraseStore";
import { Continuum_CanvasCursor } from "./CursorManager";

export class CircleCursor {
  static draw() {
    const eraseMethod = useEraseStore.getState().eraseMethod;
    const zoom = useCanvasStore.getState().zoome;
    if (eraseMethod === "soft") {
      const radius =
        zoom * ThicknesPalet.getThicknes(useEraseStore.getState().thicknesId);
      Continuum_CanvasCursor.cursor.clear();
      Continuum_CanvasCursor.cursor
        .circle(0, 0, radius)
        .fill({ color: CanvasPalet.getColor("c-1") })
        .stroke({ width: 1, color: CanvasPalet.getColor("c-1") });
    } else if (eraseMethod === "strong") {
      const radius =
        zoom * ThicknesPalet.getThicknes(useEraseStore.getState().thicknesId);
      Continuum_CanvasCursor.cursor.clear();
      Continuum_CanvasCursor.cursor
        .circle(0, 0, radius)
        .fill({ color: CanvasPalet.getColor("c-1") });
    }
  }
}
