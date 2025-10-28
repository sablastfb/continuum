import { Continuum_CanvasPalet } from "../../data/palet/PaletContainer";
import { ThicknesPalet } from "../../data/thicknes/ThickneContainer";
import useCanvasStore from "../../data/store/CanvasStore";
import { usePenStore } from "../../data/store/PenStore";
import { Continuum_Canvas } from "../CanvasApp";

export class CrossHairCursor  {
  static draw() {
    if (! Continuum_Canvas.cursorManager.cursor) return;
     Continuum_Canvas.cursorManager.cursor.clear();
    const lineWidth = 1;
    const outlineWidth = 1;
    const color = Continuum_CanvasPalet.getColor(
      usePenStore.getState().penColorId
    );

    const zoom = useCanvasStore.getState().zoome;
    const radius =
      zoom * ThicknesPalet.getThicknes(usePenStore.getState().thicknesId);
    const outerRadius = Math.max(radius, 10);
    const lineDistance = 30 + outerRadius;
     Continuum_Canvas.cursorManager.cursor
      .circle(0, 0, outerRadius)
      .stroke({
        alignment: 0,
        width: outlineWidth,
        color: Continuum_CanvasPalet.getColor("c-1"),
      })
      .circle(0, 0, radius)
      .fill(color)
      .moveTo(lineDistance, 0)
      .lineTo(outerRadius, 0)
      .moveTo(-lineDistance, 0)
      .lineTo(-outerRadius, 0)
      .moveTo(0, lineDistance)
      .lineTo(0, outerRadius)
      .moveTo(0, -lineDistance)
      .lineTo(0, -outerRadius)
      .stroke({ width: lineWidth, color: "gray" });
  }
}
