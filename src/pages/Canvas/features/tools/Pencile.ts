import { Graphics, Point } from "pixi.js";
import { CanvasPalet } from "../../data/container/PaletContainer";
import { ThicknesPalet } from "../../data/container/ThickneContainer";
import { usePencileStore } from "../../data/store/PencileStore";
import { Continuum_CanvasViewport } from "../service/Viewport";
import { Continuum_ToolManager, ITool } from "./ToolManager";
import { GraphicsData, graphicOnCanvas } from "../data/GraphicsDataManager";
import { v4 as uuidv4 } from "uuid";
import { MouseInputPoint } from "../../Types";
import { Continuum_CurveService } from "../service/CurveService";
import { CrossHairCursor } from "../cursor/CrossHair";
import { GraphicsCommand } from "../commands/Graphics";
import { Continuum_Canvas } from "../CanvasApp";

export class Pencile implements ITool {
  type: Continuum_ToolManager.ToolType = "drawing";
  private activeCurve: Graphics | null = null;
  private activeColor: string | null = null;
  private activeThicknes: number | null = null;
  private line: Point[] = [];

  public startDrawing<P extends MouseInputPoint>(e: P) {
    if (e.button !== 0) return;
    if (!Continuum_CanvasViewport.viewport) return;

    this.activeCurve = new Graphics();

    Continuum_CanvasViewport.viewport.addChild(this.activeCurve);

    this.activeColor = CanvasPalet.getColor(
      usePencileStore.getState().pencilColorId
    );
    this.activeThicknes = ThicknesPalet.getThicknes(
      usePencileStore.getState().thicknesId
    );
    const worldPos = Continuum_CanvasViewport.viewport.toWorld(e);
    this.line.push(worldPos);
    this.activeCurve.moveTo(worldPos.x, worldPos.y);
  }

  public draw<P extends MouseInputPoint>(e: P) {
    if (Continuum_Canvas.drawing === false || e.button !== -1) return;
    if (this.activeCurve === null) return;
    if (this.activeThicknes === null) return;
    if (this.activeColor === null) return;
    if (!Continuum_CanvasViewport.viewport) return;
    const worldPos = Continuum_CanvasViewport.viewport.toWorld(e);
    this.line.push(worldPos);
    this.activeCurve.lineTo(worldPos.x, worldPos.y);

    this.activeCurve.stroke({
      width: this.activeThicknes * 2,
      color: "white",
      cap: "round",
      join: "round",
    });
    this.activeCurve.tint = this.activeColor;
  }

  public stopDrawing<P extends MouseInputPoint>(e: P) {
    if (e.button !== 0 && e.button !== -1) return;
    if (this.activeThicknes === null) return;
    if (this.activeCurve === null) return;
    if (!this.activeColor) return;
    if (!Continuum_CanvasViewport.viewport) return;
    this.line.push(this.line[this.line.length - 1]);

    const optimizedPath = Continuum_CurveService.ConverLineToPath(this.line);
    const optimizedCruveGraphics =
      Continuum_CurveService.CreatGrahicPath(optimizedPath);
    optimizedCruveGraphics.stroke({
      width: this.activeThicknes * 2,
      color: "white",
      cap: "round",
      join: "round",
    });

    const g: GraphicsData = {
      id: uuidv4(),
      type: "cruve",
      graph: optimizedCruveGraphics,
      visible: true,
      graphicInfo: {
        path: optimizedPath,
        thicknes: this.activeThicknes * 2,
      },
    };

    graphicOnCanvas.set(g.id, g);
    GraphicsCommand.addNew(g);

    if (this.line.length == 2) {
      const firstCurve = optimizedPath.curves[0];
      const firstPoint = firstCurve.point1;
      if (firstPoint) {
        optimizedCruveGraphics
          .circle(firstPoint.x, firstPoint.y, this.activeThicknes)
          .fill("white");
      }
    }
    optimizedCruveGraphics.tint = this.activeColor;
    Continuum_CanvasViewport.viewport?.removeChild(this.activeCurve);
    Continuum_CanvasViewport.viewport?.addChild(optimizedCruveGraphics);
    this.line = [];
  }

  public updateCursor() {
    CrossHairCursor.draw();
  }
}
