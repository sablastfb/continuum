import { Graphics, Point } from "pixi.js";
import { useCurveStore, useMarkerStore } from "../../../data/store/PenStore";
import { ITool } from "../ToolManager";
import { GraphicsData, graphicOnCanvas } from "../../data/GraphicsDataManager";
import { v4 as uuidv4 } from "uuid";
import { Continuum_CurveService } from "../../service/CurveService";
import { GraphicsCommand } from "../../commands/Graphics";
import { Continuum_Canvas } from "../../CanvasApp";
import { PenStyle } from "./Pen";
import { MarkerStyle } from "./Marker";
import { ToolType } from "../../../data/types/ToolTypes";
import { InputState } from "../../input/InputState";
import { CrossHairCursor } from "../../../ui/cursors/CrossHair";

export type CruveStyle = "pen" | "marker";

export interface ICurveStyle {
  draw(info: any): void;
  stopDrawingStyle(info: any): void;
}

export class Curve implements ITool {
  type: ToolType = "base";
  private activeCurve: Graphics | null = null;
  private activeColor: string | null = null;
  private activeThicknes: number | null = null;
  private line: Point[] = [];
  private curveStyle!: ICurveStyle;
  constructor(private curveStyleType: CruveStyle) {
    switch (curveStyleType) {
      case "pen":
        this.type = "pen";
        this.curveStyle = new PenStyle();
        break;
      case "marker":
        this.type = "highlighter";
        this.curveStyle = new MarkerStyle();
        break;
    }
  }

  public startDrawing(e: InputState) {
    if (!Continuum_Canvas.viewportManager.viewport) return;

    this.activeCurve = new Graphics();

    Continuum_Canvas.viewportManager.viewport.addChild(this.activeCurve);
    switch (this.curveStyleType) {
      case "pen":
        this.activeColor = Continuum_Canvas.colorPalet.getColor(
          useCurveStore.getState().penColorId
        );
        this.activeThicknes = Continuum_Canvas.thicknesPalet.getThicknes(
          useCurveStore.getState().thicknesId
        );
        break;
      case "marker":
        this.activeColor = Continuum_Canvas.colorPalet.getColor(
          useMarkerStore.getState().markerColorId
        );
        this.activeThicknes = Continuum_Canvas.thicknesPalet.getThicknes(
          useMarkerStore.getState().thicknesId
        );
        break;
    }
    this.line.push(new Point(e.mousePosition.x, e.mousePosition.y));
    this.activeCurve.moveTo(e.mousePosition.x, e.mousePosition.y);
  }

  public draw(e: InputState) {
    if (this.activeCurve === null) return;
    if (this.activeThicknes === null) return;
    if (this.activeColor === null) return;
    if (!Continuum_Canvas.viewportManager.viewport) return;

    this.line.push(new Point(e.mousePosition.x, e.mousePosition.y));
    this.activeCurve.lineTo(e.mousePosition.x, e.mousePosition.y);

    this.curveStyle.draw({
      activeCurve: this.activeCurve,
      line: this.line,
      activeThicknes: this.activeThicknes,
      activeColor: this.activeColor,
    });
  }

  public endDrawing() {
    if (this.activeThicknes === null) return;
    if (this.activeCurve === null) return;
    if (!this.activeColor) return;
    if (!Continuum_Canvas.viewportManager.viewport) return;

    const optimizedPath = Continuum_CurveService.ConverLineToPath(this.line);
    const optimizedCruveGraphics =
      Continuum_CurveService.CreatGrahicPath(optimizedPath);
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
    Continuum_Canvas.viewportManager.viewport?.removeChild(this.activeCurve);
    Continuum_Canvas.viewportManager.viewport?.addChild(optimizedCruveGraphics);

    this.curveStyle.stopDrawingStyle({
      optimizedCruveGraphics,
      optimizedPath,
      line: this.line,
      activeThicknes: this.activeThicknes,
      activeColor: this.activeColor,
    });
    this.line = [];
  }

  public updateCursor() {
    switch (this.type) {
      case "pen":
        CrossHairCursor.draw();
        break;
      case "highlighter":
        CrossHairCursor.draw();
    }
  }
}
