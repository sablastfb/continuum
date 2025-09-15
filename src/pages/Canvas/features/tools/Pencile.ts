import { FederatedMouseEvent, Graphics, Point } from "pixi.js";
import { CanvasPalet } from "../../data/container/PaletContainer";
import { ThicknesPalet } from "../../data/container/ThickneContainer";
import useCanvasStore from "../../data/store/CanvasStore";
import { usePencileStore } from "../../data/store/PencileStore";
import { CanvasCursor } from "../service/Cursor";
import { CanvasViewport } from "../service/Viewport";
import { ITool, ToolType } from "./ToolManager";
import { Canvas } from "../CanvasApp";
import { ILine } from "../service/Line/LineStrategyManager";
import { GraphicsData, graphiMap, Id } from "../data/GraphicsDataManager";
import { v4 as uuidv4 } from "uuid";
import { ICommand } from "../commands/CommandManager";
import { Simplify } from "simplify-ts";

export class Pencile implements ITool {
  type: ToolType = "drawing";
  private curve: Graphics | null = null;
  private lineStrategy: ILine | null = null;
  private activeColor: string | null = null;
  private activeThicknes: number | null = null;
  private path: Point[] = [];

  public startDrawing(e: FederatedMouseEvent) {
    if (e.button !== 0) return;
    if (!CanvasViewport.viewport) return;

    this.curve = new Graphics();

    CanvasViewport.viewport.addChild(this.curve);

    this.activeColor = CanvasPalet.getColor(
      usePencileStore.getState().pencilColorId
    );
    this.activeThicknes = ThicknesPalet.getThicknes(
      usePencileStore.getState().thicknesId
    );

    this.lineStrategy = Canvas.lineStrategy.getActiveStrategy("bezier");
    this.lineStrategy?.startNewLine(e);
    const worldPos = CanvasViewport.viewport.toWorld(e.global);
    this.path.push(worldPos);
    this.firsDot(e);
  }

  private firsDot(e: FederatedMouseEvent) {
    if (this.curve === null) return;
    if (this.activeColor === null) return;
    if (this.activeThicknes === null) return;
    if (!CanvasViewport.viewport) return;
    const worldPos = CanvasViewport.viewport.toWorld(e.global);

    this.curve
      .circle(worldPos.x, worldPos.y, this.activeThicknes)
      .fill("white");

    this.curve.moveTo(worldPos.x, worldPos.y);
    this.curve.tint = this.activeColor;
  }

  public draw(e: FederatedMouseEvent) {
    if (this.curve === null) return;
    if (this.activeThicknes === null) return;
    if (this.activeColor === null) return;
    if (!CanvasViewport.viewport) return;
    const worldPos = CanvasViewport.viewport.toWorld(e.global);
    this.path.push(worldPos);
    const out = this.lineStrategy?.updateLinePoistion(e, this.curve);

    if (out?.needNew) {
      this.curve.stroke({
        width: this.activeThicknes * 2,
        color: "white",
        cap: "round",
        join: "round",
      });
    }
    this.curve.tint = this.activeColor;
  }

  public stopDrawing(e: FederatedMouseEvent) {
    if (this.activeThicknes === null) return;

    if (this.curve === null) return;
    if (!CanvasViewport.viewport) return;
    const worldPos = CanvasViewport.viewport.toWorld(e.global);
    this.path.push(worldPos);

    this.lineStrategy?.startNewLine(this.path[0]);

    const simplePath = Simplify(this.path, 2, true);

    const simpleCurve = new Graphics();
    simpleCurve.moveTo(simplePath[0].x, simplePath[0].y);
    for (const point of simplePath) {
      this.lineStrategy?.updateLinePoistion(point, simpleCurve);
    }
    this.lineStrategy?.updateLinePoistion(e, this.curve);

    this.path = [];
    const g: GraphicsData = {
      id: uuidv4(),
      graph: this.curve,
      path: [...this.path],
      visible: true,
    };
    simpleCurve.stroke({
      width: this.activeThicknes * 2,
      color: "red",
      cap: "round",
      join: "round",
    });

    if (this.activeColor) simpleCurve.tint = this.activeColor;

    graphiMap.set(g.id, g);
    const customCommand: ICommand = {
      execute: () => this.show(g.id),
      undo: () => this.hide(g.id),
    };
    Canvas.commandManage.addNewCommand(customCommand);
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
    if (    !CanvasCursor.cursor)return;
    CanvasCursor.cursor.clear();
    const lineWidth = 1;
    const outlineWidth = 1;
    const color = CanvasPalet.getColor(
      usePencileStore.getState().pencilColorId
    );

    const zoom = useCanvasStore.getState().zoome;
    const radius =
      zoom * ThicknesPalet.getThicknes(usePencileStore.getState().thicknesId);
    const outerRadius = Math.max(radius, 10);
    const lineDistance = 30 + outerRadius;
    CanvasCursor.cursor
      .circle(0, 0, outerRadius)
      .stroke({
        alignment: 0,
        width: outlineWidth,
        color: CanvasPalet.getColor("c-1"),
      })
      .circle(0, 0, radius)
      .fill(color)
      .moveTo(lineDistance, 0)
      .lineTo(outerRadius, 0)
      .moveTo(-lineDistance, 0)
      .lineTo(-outerRadius, 0)
      .moveTo(0, lineDistance)
      .lineTo(0, outerRadius)
      .moveTo(0, -lineDistance)
      .lineTo(0, -outerRadius)
      .stroke({ width: lineWidth, color: "gray" });
  }
}
