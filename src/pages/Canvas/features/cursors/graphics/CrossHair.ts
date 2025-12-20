import useCanvasStore from "../../../data/store/CanvasStore.ts";
import { useCurveStore } from "../../../data/store/PenStore.ts";
import { Continuum_Canvas } from "../../CanvasApp.ts";
import {ICursor} from "../CursorManager.ts";
import {useKeyStore} from "../../../data/store/KeyStore.ts";

export class CrossHairCursor implements ICursor  {
    updateCursor() {
    if (! Continuum_Canvas.cursorManager.cursorGraphic) return;

     Continuum_Canvas.cursorManager.cursorGraphic.clear();
    const lineWidth = 1;
    const outlineWidth = 1;
    const color = Continuum_Canvas.colorPalette.getColor(
      useCurveStore.getState().penSettings.colorId
    );
    const zoom = useCanvasStore.getState().zoom;
    const radius =
      zoom * Continuum_Canvas.thicknessPalette.getThickness(useCurveStore.getState().thicknessId);
    const outerRadius = Math.max(radius+5, 10);

    const alpha = useKeyStore.getState().pointerDown ? 0 :0.5 ;

    const lineDistance = 19 + outerRadius;
     Continuum_Canvas.cursorManager.cursorGraphic
      .circle(0, 0, outerRadius).fill({color:"white", alpha})
      .stroke({
        alignment: 0,
        width: outlineWidth,
        color: Continuum_Canvas.colorPalette.getColor("c-1"),
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
