import { Graphics, Point } from "pixi.js";
import { CanvasPalet } from "../../data/container/PaletContainer";
import { ThicknesPalet } from "../../data/container/ThickneContainer";
import useCanvasStore from "../../data/store/CanvasStore";
import { usePencileStore } from "../../data/store/PencileStore";
import { CanvasCursor } from "../service/Cursor";
import { CanvasViewport } from "../service/Viewport";
import { Continuum_ToolManager, ITool } from "./ToolManager";
import { Continuum_Canvas } from "../CanvasApp";
import {
  Continuum_LineStrategyManager,
  ILine,
} from "../Line/LineStrategyManager";
import { GraphicsData, graphiMap, Id } from "../data/GraphicsDataManager";
import { v4 as uuidv4 } from "uuid";
import { ICommand } from "../commands/CommandManager";
import { Simplify } from "simplify-ts";
import { MouseInputPoint } from "../../Types";
import { PaperScope, Project, Path, Point as PaperPoint } from "paper";
import { paperCcc } from "../../CanvasPage";
import { Continuum } from "../service/Debug/DebugGraphics";

export class Pencile implements ITool {
  type: Continuum_ToolManager.ToolType = "drawing";
  private curve: Graphics | null = null;
  private lineStrategy: ILine | null = null;
  private activeColor: string | null = null;
  private activeThicknes: number | null = null;
  private path: Point[] = [];
  private pathPaper!: paper.Path;

  public startDrawing<P extends MouseInputPoint>(e: P) {
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

    this.lineStrategy =
      Continuum_LineStrategyManager.getActiveStrategy("bezier");
    this.lineStrategy?.startNewLine(e);
    const worldPos = CanvasViewport.viewport.toWorld(e);
    this.path.push(worldPos);

    this.firsDot(e);
    this.pathPaper = new paperCcc.Path();
  }

  private firsDot<P extends MouseInputPoint>(e: P) {
    if (this.curve === null) return;
    if (this.activeColor === null) return;
    if (this.activeThicknes === null) return;
    if (!CanvasViewport.viewport) return;
    const worldPos = CanvasViewport.viewport.toWorld(e);

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
    if (!CanvasViewport.viewport) return;
    const worldPos = CanvasViewport.viewport.toWorld(e);
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

    ///
  }

  public stopDrawing<P extends MouseInputPoint>(e: P) {
    if (e.button !== 0) return;
    if (this.activeThicknes === null) return;

    if (this.curve === null) return;
    if (!CanvasViewport.viewport) return;
    const worldPos = CanvasViewport.viewport.toWorld(e);
    this.path.push(worldPos);

    this.lineStrategy?.startNewLine(this.path[0]);

    const simplePath = Simplify(this.path, 2, true);

    const simpleCurve = new Graphics();
    simpleCurve.moveTo(simplePath[0].x, simplePath[0].y);
    for (const point of simplePath) {
      this.lineStrategy?.updateLinePoistion(point, simpleCurve);
    }
    this.lineStrategy?.updateLinePoistion(e, this.curve);

    const g: GraphicsData = {
      id: uuidv4(),
      graph: this.curve,
      path: [...this.path],
      visible: true,
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

    this.pathPaper.add(...this.path);
    var segmentCount = this.pathPaper.segments.length;
    this.pathPaper.simplify(5);

    var newSegmentCount = this.pathPaper.segments.length;
    var difference = segmentCount - newSegmentCount;
    var percentage = 100 - Math.round((newSegmentCount / segmentCount) * 100);
    console.log(this.path.length);
    console.log(
      difference +
        " of the " +
        segmentCount +
        " segments were removed. Saving " +
        percentage +
        "%"
    );
    this.Paper();

    this.path = [];
  }

  private Paper() {
    const pixiGraphics = new Graphics();

    const segments = this.pathPaper.segments;
    pixiGraphics.moveTo(segments[0].point.x, segments[0].point.y);

    // Iterate through segments to draw lines or curves
    for (let i = 1; i < segments.length; i++) {
      const seg = segments[i];
      const prevSeg = segments[i - 1];
      const cp1 = prevSeg.point.add(prevSeg.handleOut);
      const cp2 = seg.point.add(seg.handleIn);
      // Check if the segment has Bézier handles
      if (prevSeg.handleOut && seg.handleIn) {
        // Draw a cubic Bézier curve
        pixiGraphics.bezierCurveTo(
          cp1.x,
          cp1.y,
          cp2.x,
          cp2.y,
          seg.point.x,
          seg.point.y
        );
      } else {
        // Draw a straight line
        pixiGraphics.lineTo(seg.point.x, seg.point.y);
      }

      pixiGraphics.stroke({
        width: this.activeThicknes * 2,
        color: "white",
        cap: "round",
        join: "round",
      });
      pixiGraphics.tint = this.activeColor;
    }
    CanvasViewport.viewport?.removeChild(this.curve);

    CanvasViewport.viewport?.addChild(pixiGraphics);
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
    if (!CanvasCursor.cursor) return;
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
