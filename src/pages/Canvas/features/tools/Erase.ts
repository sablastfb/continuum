import { ThicknesPalet } from "../../data/container/ThickneContainer";
import { useEraseStore } from "../../data/store/EraseStore";
import { Continuum_CanvasViewport } from "../service/Viewport";
import { MouseInputPoint, SimplePoint } from "../../Types";
import { Continuum_ToolManager, ITool } from "./ToolManager";
import { CircleCursor } from "../cursor/Circle";
import { Continuum_CollisionService } from "../service/ColisionDetection";

export class Erase implements ITool {
  type: Continuum_ToolManager.ToolType = "eraser";

  public startDrawing<P extends MouseInputPoint>(e: P) {
    if (e.button !== 0) return;
    if (!Continuum_CanvasViewport.viewport) return;

    const activePoint = Continuum_CanvasViewport.viewport?.toWorld(e);
    Continuum_CollisionService.StartContinouseColison(activePoint);
  }
  lastPoint!: SimplePoint;

  public draw<P extends MouseInputPoint>(e: P) {
    const activePoint = Continuum_CanvasViewport.viewport?.toWorld(e);
    if (!activePoint) return;
    const radius = ThicknesPalet.getThicknes(
      useEraseStore.getState().thicknesId
    );

    const slowDetectionGraphics =
      Continuum_CollisionService.GetAllGraphicAroundPoint(radius, activePoint);

    for (const g of slowDetectionGraphics) {
      g.visible = false;
      g.graph.visible = false;
    }

    const fastDetectionGraphics =
      Continuum_CollisionService.GetContinouseColison(activePoint);

    for (const g of fastDetectionGraphics) {
      g.visible = false;
      g.graph.visible = false;
    }
  }

  updateCursor(): void {
    CircleCursor.draw();
  }
}
