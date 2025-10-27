import { ThicknesPalet } from "../../data/thicknes/ThickneContainer";
import { useEraseStore } from "../../data/store/EraseStore";
import { Continuum_CanvasViewport } from "../service/Viewport";
import { ITool } from "./ToolManager";
import { CircleCursor } from "../cursor/Circle";
import { Continuum_CollisionService } from "../service/ColisionDetection";
import { GraphicsData } from "../data/GraphicsDataManager";
import { GraphicsCommand } from "../commands/Graphics";
import type { EraserToolType } from "../../data/types/ToolTypes";
import type { MouseInputPoint} from "../../data/types/PointTypes";
import { InputState } from "../input/InputState";

export class Erase implements ITool {
  type: EraserToolType = "eraser";
  delteGraphics: GraphicsData[] = [];

  public startDrawing(e: InputState) {
    if (!Continuum_CanvasViewport.viewport) return;

    this.delteGraphics = [];
    const activePoint = Continuum_CanvasViewport.viewport?.toWorld(e.mousePosition);
    Continuum_CollisionService.StartContinouseColison(activePoint);
  }

  public draw(e: InputState) {
    const activePoint = Continuum_CanvasViewport.viewport?.toWorld(e.mousePosition);
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

  public stopDrawing(e: InputState) {
    GraphicsCommand.removeGraphics(this.delteGraphics);
    this.delteGraphics = [];
  }

  updateCursor(): void {
    CircleCursor.draw();
  }
}
