import useCanvasStore from "../../data/store/CanvasStore";
import { useEraseStore } from "../../data/store/EraseStore";
import { Continuum_Canvas } from "../../features/CanvasApp";

export class CircleCursor {
  static draw() {
    const zoom = useCanvasStore.getState().zoome;

    const radius =
      zoom * Continuum_Canvas.thicknesPalet.getThicknes(useEraseStore.getState().thicknesId);
     Continuum_Canvas.cursorManager.cursor.clear();
     Continuum_Canvas.cursorManager.cursor
      .circle(0, 0, radius)
      .fill({ color: Continuum_Canvas.colorPalet.getColor("c-2"), alpha: 0.5 })
      .stroke({ width: 1, color: Continuum_Canvas.colorPalet.getColor("c-2") });
  }
}
