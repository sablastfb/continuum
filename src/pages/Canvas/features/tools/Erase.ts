import { DEG_TO_RAD, Graphics } from "pixi.js";
import { Continuum_CanvasCursor } from "../cursor/Cursor";
import { CanvasPalet } from "../../data/container/PaletContainer";
import useCanvasStore from "../../data/store/CanvasStore";
import { ThicknesPalet } from "../../data/container/ThickneContainer";
import { useEraseStore } from "../../data/store/EraseStore";
import { Continuum_CanvasViewport } from "../service/Viewport";

import { usePencileStore } from "../../data/store/PencileStore";
import { MouseInputPoint, SimplePoint } from "../../Types";
import { Continuum_ToolManager, ITool } from "./ToolManager";
import { graphiMap } from "../data/GraphicsDataManager";
import { Continuum_Math } from "../service/CanvasUtils";
import { Continuum_CurveService } from "../service/CurveService";

export class Erase implements ITool {
  type: Continuum_ToolManager.ToolType = "eraser";
  private curve: Graphics | null = null;
  private activeThicknes: number | null = null;

  public startDrawing<P extends MouseInputPoint>(e: P) {
    if (e.button !== 0) return;
    if (!Continuum_CanvasViewport.viewport) return;

    this.curve = new Graphics();
    this.curve.blendMode = "erase";

    Continuum_CanvasViewport.viewport.addChild(this.curve);
    this.activeThicknes = ThicknesPalet.getThicknes(
      usePencileStore.getState().thicknesId
    );
    const activePoint = Continuum_CanvasViewport.viewport?.toWorld(e);

    this.lastPoint = activePoint;
    // this.firsDot(e);
  }
  lastPoint!: SimplePoint;

  public draw<P extends MouseInputPoint>(e: P) {
    // if (this.curve === null) return;
    // if (!CanvasViewport.viewport) return;
    const zoom = useCanvasStore.getState().zoome;
    const activePoint = Continuum_CanvasViewport.viewport?.toWorld(e);
    if (!activePoint) return;
    const radius =
      zoom * ThicknesPalet.getThicknes(useEraseStore.getState().thicknesId);

    for (const g of graphiMap.values()) {
      if (g.visible === false) continue;
      const pointOfCurve = g.graphicInfo.path.getNearestPoint(activePoint);
      if (!pointOfCurve) continue;

      const c = { x: pointOfCurve.x, y: pointOfCurve.y };
      const dist = Continuum_Math.Distance(activePoint, c);
      if (dist <= radius + g.graphicInfo.thicknes / 2) {
        g.visible = false;
        g.graph.visible = false;

      }
    }

    const diffPath = Continuum_CurveService.ConverLineToPath([
      this.lastPoint,
      activePoint,
    ]);
    for (const g of graphiMap.values()) {
      if (g.visible === false) continue;
      const pointOfCurve = g.graphicInfo.path.getIntersections(diffPath);
      if (pointOfCurve.length >0) {
        g.visible = false;
        g.graph.visible = false;
      }
    }
     this.lastPoint = activePoint;
    //
  }

  updateCursor(): void {
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
