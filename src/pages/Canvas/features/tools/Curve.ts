import { AlphaFilter, BlurFilter, Graphics, NoiseFilter, Point } from "pixi.js";
import { useCurveStore } from "../../data/store/PenStore";
import { ITool } from "./ToolManager";
import { GraphicsData, graphicOnCanvas } from "../data/GraphicsDataManager";
import { v4 as uuidv4 } from "uuid";
import { Continuum_CurveService } from "../service/CurveService";
import { GraphicsCommand } from "../commands/Graphics";
import { Continuum_Canvas } from "../CanvasApp";
import { ToolType } from "../../data/types/ToolTypes";
import { InputState } from "../input/InputState";
import { CrossHairCursor } from "../../ui/cursors/CrossHair";
import { Bluetooth } from "lucide-react";
export type CruveStyle = "pen" | "marker";

export class Curve implements ITool {
  type: ToolType = "base";
  private activeCurve: Graphics | null = null;
  private activeColor: string | null = null;
  private activeThicknes: number | null = null;
  private line: Point[] = [];
  private drawingLayer!: Graphics;
  constructor(private curveStyleType: CruveStyle) {
    switch (curveStyleType) {
      case "pen":
        this.type = "pen";
        break;
      case "marker":
        this.type = "marker";
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
          useCurveStore.getState().penSettings.colorId
        );
        this.activeThicknes = Continuum_Canvas.thicknesPalet.getThicknes(
          useCurveStore.getState().penSettings.thicknesId
        );
        break;
      case "marker":
        this.activeColor = Continuum_Canvas.colorPalet.getColor(
          useCurveStore.getState().markerSettings.colorId
        );
        this.activeThicknes = Continuum_Canvas.thicknesPalet.getThicknes(
          useCurveStore.getState().markerSettings.thicknesId
        );
        this.activeCurve.filters = [new AlphaFilter({ alpha: 0.2 }), new BlurFilter({quality:3, strength:0.5})];

        break;
    }
    this.line.push(new Point(e.mousePosition.x, e.mousePosition.y));
    this.activeCurve.moveTo(e.mousePosition.x, e.mousePosition.y);
    this.drawingLayer = new Graphics();

    Continuum_Canvas.viewportManager.viewport.addChild(this.drawingLayer);
  }

  public draw(e: InputState) {
    if (this.activeCurve === null) return;
    if (this.activeThicknes === null) return;
    if (this.activeColor === null) return;
    if (!Continuum_Canvas.viewportManager.viewport) return;

    this.line.push(new Point(e.mousePosition.x, e.mousePosition.y));
    this.activeCurve.lineTo(e.mousePosition.x, e.mousePosition.y);

    switch (this.curveStyleType) {
      case "pen":
        this.activeCurve.stroke({
          width: this.activeThicknes * 2,
          color: "white",
          cap: "round",
          join: "round",
        });
        this.activeCurve.tint = this.activeColor;
        break;
      case "marker":
        this.activeCurve.stroke({
          width: this.activeThicknes * 2,
          join: "round",
          color: "white",
          cap: "round",
        });
        this.activeCurve.tint = this.activeColor;

        break;
    }
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

    switch (this.curveStyleType) {
      case "pen":
        if (this.line.length == 2) {
          const firstCurve = optimizedPath.curves[0];
          const firstPoint = firstCurve.point1;
          if (firstPoint) {
            optimizedCruveGraphics
              .circle(firstPoint.x, firstPoint.y, this.activeThicknes)
              .fill("white");
          }
        }
        optimizedCruveGraphics.stroke({
          width: this.activeThicknes * 2,
          color: "white",
          cap: "round",
          join: "round",
        });
        optimizedCruveGraphics.tint = this.activeColor;
        break;
      case "marker":
        if (this.line.length == 2) {
          const firstCurve = optimizedPath.curves[0];
          const firstPoint = firstCurve.point1;
          if (firstPoint) {
            optimizedCruveGraphics
              .circle(firstPoint.x, firstPoint.y, this.activeThicknes)
              .fill("white");
          }
        }
        optimizedCruveGraphics.stroke({
          width: this.activeThicknes * 2,
          join: "round",
          color: "white",
          cap: "round",
        });

        optimizedCruveGraphics.tint = this.activeColor;
         optimizedCruveGraphics.filters = [new AlphaFilter({ alpha: 1 })];
  optimizedCruveGraphics.filters[0].resolution = window.devicePixelRatio;
        // optimizedCruveGraphics.filters = [new AlphaFilter({ alpha: 0.5 })];
        break;
    }

    this.line = [];
  }

  public updateCursor() {
    switch (this.type) {
      case "pen":
        CrossHairCursor.draw();
        break;
      case "marker":
        CrossHairCursor.draw();
    }
  }
}
