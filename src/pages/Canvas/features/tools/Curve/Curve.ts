import { Graphics, Point } from "pixi.js";
import { Continuum_CanvasPalet } from "../../../data/palet/PaletContainer";
import { ThicknesPalet } from "../../../data/thicknes/ThickneContainer";
import { usePencileStore } from "../../../data/store/PencileStore";
import { Continuum_CanvasViewport } from "../../service/Viewport";
import { Continuum_ToolManager, ITool } from "../ToolManager";
import { GraphicsData, graphicOnCanvas } from "../../data/GraphicsDataManager";
import { v4 as uuidv4 } from "uuid";
import { MouseInputPoint } from "../../../Types";
import { Continuum_CurveService } from "../../service/CurveService";
import { CrossHairCursor } from "../../cursor/CrossHair";
import { GraphicsCommand } from "../../commands/Graphics";
import { Continuum_Canvas } from "../../CanvasApp";
import {
  MouseButton,
  Continuum_MouseService,
} from "../../service/MouseService";
import { PenStyle } from "./Pen";
import { PencileStyle } from "./Pencile";
import { MarkerStyle } from "./Marker";
import { useMarkerStore } from "../../../data/store/MarkerStore";
import { SquareCursor } from "../../cursor/Square";

export type CruveStyle = "pen" | "pencile" | "marker";

export interface ICurveStyle {
  draw(info: any): void;
  stopDrawingStyle(info: any): void;
}

export class Curve implements ITool {
  type: Continuum_ToolManager.ToolType = "base";
  private activeCurve: Graphics | null = null;
  private activeColor: string | null = null;
  private activeThicknes: number | null = null;
  private line: Point[] = [];
  private curveStyle!: ICurveStyle;
  constructor(private curveStyleType: CruveStyle) {
    switch (curveStyleType) {
      case "pen":
        this.type = 'pen';
        this.curveStyle = new PenStyle();
        break;
      case "pencile":
        this.type = 'pencile';
        this.curveStyle = new PencileStyle();
        break;
      case "marker":
        this.type = 'marker';
        this.curveStyle = new MarkerStyle();
        break;
    }
  }

  public startDrawing<P extends MouseInputPoint>(e: P) {
    if (!Continuum_MouseService.isButtonPressed(e, MouseButton.Left)) {
      return;
    }
    if (!Continuum_CanvasViewport.viewport) return;

    this.activeCurve = new Graphics();

    Continuum_CanvasViewport.viewport.addChild(this.activeCurve);
    switch (this.curveStyleType) {
      case "pen":
        this.activeColor = Continuum_CanvasPalet.getColor(
          usePencileStore.getState().pencilColorId
        );
        this.activeThicknes = ThicknesPalet.getThicknes(
          usePencileStore.getState().thicknesId
        );
        break;
      case "pencile":
         this.activeColor = Continuum_CanvasPalet.getColor(
          usePencileStore.getState().pencilColorId
        );
        this.activeThicknes = ThicknesPalet.getThicknes(
          usePencileStore.getState().thicknesId
        );
        break;
      case "marker":
        this.activeColor = Continuum_CanvasPalet.getColor(
          useMarkerStore.getState().markerColorId
        );
        this.activeThicknes = ThicknesPalet.getThicknes(
          useMarkerStore.getState().thicknesId
        );
        break;
    }
    const worldPos = Continuum_CanvasViewport.viewport.toWorld(e);
    this.line.push(worldPos);
    this.activeCurve.moveTo(worldPos.x, worldPos.y);
  }

  public draw<P extends MouseInputPoint>(e: P) {
    if (Continuum_Canvas.drawing === false) return;
    if (!Continuum_MouseService.isDragging(e, MouseButton.Left)) return;
    if (this.activeCurve === null) return;
    if (this.activeThicknes === null) return;
    if (this.activeColor === null) return;
    if (!Continuum_CanvasViewport.viewport) return;
    const worldPos = Continuum_CanvasViewport.viewport.toWorld(e);
    this.line.push(worldPos);
    this.activeCurve.lineTo(worldPos.x, worldPos.y);

    this.curveStyle.draw({
      activeCurve: this.activeCurve,
      line: this.line,
      activeThicknes: this.activeThicknes,
      activeColor: this.activeColor,
    });

  }

  public stopDrawing<P extends MouseInputPoint>(e: P) {
    if (
      !Continuum_MouseService.isButtonReleased(e, MouseButton.Left) &&
      Continuum_Canvas.drawing === true
    ) {
      return;
    }

    if (this.activeThicknes === null) return;
    if (this.activeCurve === null) return;
    if (!this.activeColor) return;
    if (!Continuum_CanvasViewport.viewport) return;
    

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
    Continuum_CanvasViewport.viewport?.removeChild(this.activeCurve);
    Continuum_CanvasViewport.viewport?.addChild(optimizedCruveGraphics);

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
    switch (this.type){
      case "pencile":
        CrossHairCursor.draw();
        break;
      case "marker":
        CrossHairCursor.draw();
    }
  }
}
