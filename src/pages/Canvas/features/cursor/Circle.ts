import { Continuum_CanvasPalet } from "../../data/palet/PaletContainer";
import { ThicknesPalet } from "../../data/thicknes/ThickneContainer";
import useCanvasStore from "../../data/store/CanvasStore";
import { useEraseStore } from "../../data/store/EraseStore";
import { Continuum_Canvas } from "../CanvasApp";

export class CircleCursor {
  static draw() {
    const zoom = useCanvasStore.getState().zoome;

    const radius =
      zoom * ThicknesPalet.getThicknes(useEraseStore.getState().thicknesId);
     Continuum_Canvas.cursorManager.cursor.clear();
     Continuum_Canvas.cursorManager.cursor
      .circle(0, 0, radius)
      .fill({ color: Continuum_Canvas.palet.getColor("c-2"), alpha: 0.5 })
      .stroke({ width: 1, color: Continuum_Canvas.palet.getColor("c-2") });
  }
}
