import { ThicknesPalet } from "../../data/container/ThickneContainer";
import { useEraseStore } from "../../data/store/EraseStore";
import { Continuum_CanvasViewport } from "../service/Viewport";
import { MouseInputPoint } from "../../Types";
import { Continuum_ToolManager, ITool } from "./ToolManager";
import { CircleCursor } from "../cursor/Circle";
import { Continuum_CollisionService } from "../service/ColisionDetection";
import { GraphicsData } from "../data/GraphicsDataManager";
import { GraphicsCommand } from "../commands/Graphics";
import { Continuum_Canvas } from "../CanvasApp";
import { MouseButton, Continuum_MouseService } from "../service/MouseService";

export class Erase implements ITool {
  type: Continuum_ToolManager.ToolType = "eraser";
  delteGraphics: GraphicsData[] = [];

  public startDrawing<P extends MouseInputPoint>(e: P) {
    if (!Continuum_MouseService.isButtonPressed(e, MouseButton.Left)) {
      return;
    }
    if (!Continuum_CanvasViewport.viewport) return;

    this.delteGraphics = [];
    const activePoint = Continuum_CanvasViewport.viewport?.toWorld(e);
    Continuum_CollisionService.StartContinouseColison(activePoint);
  }

  public draw<P extends MouseInputPoint>(e: P) {
    if (Continuum_Canvas.drawing === false) return;
    if (!Continuum_MouseService.isDragging(e, MouseButton.Left)) return;

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
      this.delteGraphics.push(g);
    }

    const fastDetectionGraphics =
      Continuum_CollisionService.GetContinouseColison(activePoint);

    for (const g of fastDetectionGraphics) {
      g.visible = false;
      g.graph.visible = false;
      this.delteGraphics.push(g);
    }
  }

  public stopDrawing<P extends MouseInputPoint>(e: P) {
    if (!Continuum_MouseService.isButtonReleased(e, MouseButton.Left)) {
      return;
    }
    GraphicsCommand.removeGraphics(this.delteGraphics);
    this.delteGraphics = [];
    debugger;
  }

  updateCursor(): void {
    CircleCursor.draw();
  }
}
