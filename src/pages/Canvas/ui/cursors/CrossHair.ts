import useCanvasStore from "../../data/store/CanvasStore";
import { useCurveStore } from "../../data/store/PenStore";
import { Continuum_Canvas } from "../../features/CanvasApp";

export class CrossHairCursor  {
  static draw() {
    if (! Continuum_Canvas.cursorManager.cursor) return;
    const down = 
    Continuum_Canvas.inputStateManager.inputState.pointerDown;
     Continuum_Canvas.cursorManager.cursor.clear();
    const lineWidth = 1;
    const outlineWidth = 1;
    const color = Continuum_Canvas.colorPalet.getColor(
      useCurveStore.getState().penSettings.colorId
    );
    console.log(down);
    const zoom = useCanvasStore.getState().zoome;
    const radius =
      zoom * Continuum_Canvas.thicknesPalet.getThicknes(useCurveStore.getState().penSettings.thicknesId);
    const outerRadius = Math.max(radius+5, 10);
    const lineDistance = 19 + outerRadius;
     Continuum_Canvas.cursorManager.cursor
      .circle(0, 0, outerRadius).fill({color:"white", alpha:0.5})
      .stroke({
        alignment: 0,
        width: outlineWidth,
        color: Continuum_Canvas.colorPalet.getColor("c-1"),
      })
      .circle(0, 0, radius)
      .fill(color)
      // .moveTo(lineDistance, 0)
      // .lineTo(outerRadius, 0)
      // .moveTo(-lineDistance, 0)
      // .lineTo(-outerRadius, 0)
      // .moveTo(0, lineDistance)
      // .lineTo(0, outerRadius)
      // .moveTo(0, -lineDistance)
      // .lineTo(0, -outerRadius)
      .stroke({ width: lineWidth, color: "gray" });
  }
}
