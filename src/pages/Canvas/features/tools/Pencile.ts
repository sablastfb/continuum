import { Graphics, Point } from "pixi.js";
import { CanvasPalet } from "../../data/container/PaletContainer";
import { ThicknesPalet } from "../../data/container/ThickneContainer";
import useCanvasStore from "../../data/store/CanvasStore";
import { usePencileStore } from "../../data/store/PencileStore";
import { Continuum_CanvasCursor } from "../cursor/Cursor";
import { Continuum_CanvasViewport } from "../service/Viewport";
import { Continuum_ToolManager, ITool } from "./ToolManager";
import { Continuum_Canvas } from "../CanvasApp";

import { GraphicsData, graphiMap, Id } from "../data/GraphicsDataManager";
import { v4 as uuidv4 } from "uuid";
import { ICommand } from "../commands/CommandManager";
import { Simplify } from "simplify-ts";
import { MouseInputPoint } from "../../Types";
import { Continuum_CurveService } from "../service/CurveService";
import { PencileCursor } from "../cursor/Pencile";

export class Pencile implements ITool {
  type: Continuum_ToolManager.ToolType = "drawing";
  private curve: Graphics | null = null;
  private activeColor: string | null = null;
  private activeThicknes: number | null = null;
  private path: Point[] = [];

  public startDrawing<P extends MouseInputPoint>(e: P) {
    if (e.button !== 0) return;
    if (!Continuum_CanvasViewport.viewport) return;

    this.curve = new Graphics();

    Continuum_CanvasViewport.viewport.addChild(this.curve);

    this.activeColor = CanvasPalet.getColor(
      usePencileStore.getState().pencilColorId
    );
    this.activeThicknes = ThicknesPalet.getThicknes(
      usePencileStore.getState().thicknesId
    );
    const worldPos = Continuum_CanvasViewport.viewport.toWorld(e);
    this.path.push(worldPos);

    // this.firsDot(e);
  }

  private firsDot<P extends MouseInputPoint>(e: P) {
    if (this.curve === null) return;
    if (this.activeColor === null) return;
    if (this.activeThicknes === null) return;
    if (!Continuum_CanvasViewport.viewport) return;
    const worldPos = Continuum_CanvasViewport.viewport.toWorld(e);

    this.curve
      .circle(worldPos.x, worldPos.y, this.activeThicknes)
      .fill("white");

    this.curve.moveTo(worldPos.x, worldPos.y);
    this.curve.tint = this.activeColor;
  }

  public draw<P extends MouseInputPoint>(e: P) {
    if (this.curve === null) return;
    if (this.activeThicknes === null) return;
    if (this.activeColor === null) return;
    if (!Continuum_CanvasViewport.viewport) return;
    const worldPos = Continuum_CanvasViewport.viewport.toWorld(e);
    this.path.push(worldPos);
    this.curve.lineTo(worldPos.x, worldPos.y);
    // const out = this.lineStrategy?.updateLinePoistion(e, this.curve);

    this.curve.stroke({
      width: this.activeThicknes * 2,
      color: "white",
      cap: "round",
      join: "round",
    });
    this.curve.tint = this.activeColor;
  }

  public stopDrawing<P extends MouseInputPoint>(e: P) {
    if (e.button !== 0) return;
    if (this.activeThicknes === null) return;

    if (this.curve === null) return;
    if (!Continuum_CanvasViewport.viewport) return;
    const worldPos = Continuum_CanvasViewport.viewport.toWorld(e);
    this.path.push(worldPos);

    const simplePath = Simplify(this.path, 2, true);

    const simpleCurve = new Graphics();
    simpleCurve.moveTo(simplePath[0].x, simplePath[0].y);
    const optimizedPath = Continuum_CurveService.ConverLineToPath(this.path);
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
    simpleCurve.stroke({
      width: this.activeThicknes * 2,
      color: "white",
      cap: "round",
      join: "round",
    });

    if (this.activeColor) simpleCurve.tint = this.activeColor;

    graphiMap.set(g.id, g);
    const customCommand: ICommand = {
      execute: () => this.show(g.id),
      undo: () => this.hide(g.id),
    };

    Continuum_Canvas.commandManage.addNewCommand(customCommand);

    if (!this.activeColor) return;
    optimizedCruveGraphics.tint = this.activeColor;
    Continuum_CanvasViewport.viewport?.removeChild(this.curve);
    Continuum_CanvasViewport.viewport?.addChild(optimizedCruveGraphics);
    this.path = [];
  }

  private show(id: Id) {
    const g = graphiMap.get(id);
    if (g) {
      g.graph.visible = true;
    }
  }

  private hide(graph: Id) {
    const g = graphiMap.get(graph);
    if (g) {
      g.graph.visible = false;
    }
  }

  public updateCursor() {
    PencileCursor();
  }
}
