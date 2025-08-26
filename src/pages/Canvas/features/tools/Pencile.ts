import { Viewport } from "pixi-viewport";
import { FederatedMouseEvent, Graphics } from "pixi.js";
import { Point } from "../../data/types/CanvasTypes";
import { MinimumDistanceToNextLine } from "../../data/constants/CanvasConstants";
import { Distance } from "../utils/CanvasUtils";
import { ITool } from "./ITool";
import { CanvasPalet } from "../../data/container/PaletContainer";
import { ThicknesPalet } from "../../data/container/ThickneContainer";
import useCanvasStore from "../../data/store/CanvasStore";
import { usePencileStore } from "../../data/store/PencileStore";
import { CanvasCursor } from "../service/Cursor";
import { CanvasViewport } from "../service/Viewport";

export class Pencile implements ITool {
  private graphic: Graphics | null = null;
  private curve: Graphics | null = null;
  private lastPoint: Point = { x: 0, y: 0 };
  private lastPoints: Point[] = [];
  private count = 0;

  constructor() {}

  public startDrawing(e: FederatedMouseEvent) {
    if (!CanvasViewport.viewport) return;
    const worldPos = CanvasViewport.viewport.toWorld(e.global);
    this.graphic = new Graphics();
    this.curve = new Graphics();

    // const guid: string = uuidv4();
    // graphicsData.push({ id: guid, graph: this.graphic });

    this.graphic.moveTo(worldPos.x, worldPos.y);
    this.curve.moveTo(worldPos.x, worldPos.y);
    this.graphic.stroke({
      color: "white",
      cap: "round",
      join: "round",
    });

    this.curve.stroke({
      color: "red",
      cap: "round",
      join: "round",
    });
    // CanvasViewport.viewport.addChild(this.graphic);
    CanvasViewport.viewport.addChild(this.curve);
    this.lastPoint = { x: worldPos.x, y: worldPos.y };
    this.count = 0;
  }

  public draw(e: FederatedMouseEvent) {
    if (this.graphic === null) return;
    if (this.curve === null) return;
    if (!CanvasViewport.viewport) return;

    const worldPos = CanvasViewport.viewport.toWorld(e.global) as Point;
    if (Distance(worldPos, this.lastPoint) < MinimumDistanceToNextLine) {
      return;
    }

    this.graphic.lineTo(worldPos.x, worldPos.y);

    ///
    if (this.lastPoints.length===4){

      const p0 = this.lastPoints[0];
      const p1 = this.lastPoints[1];
      const p2 = this.lastPoints[2];
      const p3 = this.lastPoints[3];
      
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      
      this.curve.bezierCurveTo(cp1x,cp1y,cp2x,cp2y , p2.x, p2.y,0);

      const cp1 = new Graphics().circle(cp1x,cp1y,3).fill("blue");
      const cp2 = new Graphics().circle(cp2x,cp2y,3).fill("blue");
          // CanvasViewport.viewport.addChild(cp1);
          // CanvasViewport.viewport.addChild(cp2);
    }

    this.curve.stroke({
      width:
        ThicknesPalet.getThicknes(usePencileStore.getState().thicknesId) * 2,
      color: "red",
      cap: "round",
      join: "round",
    });

    this.graphic.stroke({
      width:
        ThicknesPalet.getThicknes(usePencileStore.getState().thicknesId) * 2,
      color: "white",
      cap: "round",
      join: "round",
    });
    const color = usePencileStore.getState().pencilColorId;
    this.graphic.tint = CanvasPalet.getColor(color);
    this.count++;
    this.lastPoint = { x: worldPos.x, y: worldPos.y };
    this.lastPoints.push(this.lastPoint); while(this.lastPoints.length >4) this.lastPoints.shift();
  }

  public stopDrawing() {
    if (this.graphic === null) return;
  }

  public updateCursor() {
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
    CanvasCursor.cursor.clear();
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
