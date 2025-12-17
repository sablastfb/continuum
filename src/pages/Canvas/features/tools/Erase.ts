import { useEraseStore } from "../../data/store/EraseStore";
import { ITool } from "./ToolManager";
import { Continuum_CollisionService } from "../service/ColisionDetection";
import { GraphicsData } from "../data/GraphicsDataManager";
import { GraphicsCommand } from "../commands/Graphics";
import type { EraserToolType } from "../../data/types/ToolTypes";
import { InputState } from "../input/InputState";
import { Continuum_Canvas } from "../CanvasApp";
import { CircleCursor } from "../../ui/cursors/Circle";

export class Erase implements ITool {
  type: EraserToolType = "eraser";
  deleteGraphics: GraphicsData[] = [];

  public startDrawing(e: InputState) {
    if (! Continuum_Canvas.viewportManager.viewport) return;

    this.deleteGraphics = [];
    const activePoint = Continuum_Canvas.viewportManager.viewport?.toWorld(e.mousePosition);
    Continuum_CollisionService.StartContinouseColison(activePoint);
  }

  public draw(e: InputState) {
    const activePoint =  Continuum_Canvas.viewportManager.viewport?.toWorld(e.mousePosition);
    if (!activePoint) return;
    const radius = Continuum_Canvas.thicknessPalette.getThickness(
      useEraseStore.getState().thicknessId
    );

    const slowDetectionGraphics =
      Continuum_CollisionService.GetAllGraphicAroundPoint(radius, activePoint);

    for (const g of slowDetectionGraphics) {
      g.visible = false;
      g.graph.visible = false;
      this.deleteGraphics.push(g);
    }

    const fastDetectionGraphics =
      Continuum_CollisionService.GetContinouseColison(activePoint);

    for (const g of fastDetectionGraphics) {
      g.visible = false;
      g.graph.visible = false;
      this.deleteGraphics.push(g);
    }
  }

  public endDrawing() {
    GraphicsCommand.removeGraphics(this.deleteGraphics);
    this.deleteGraphics = [];
  }

  updateCursor(): void {
    CircleCursor.draw();
  }
}
