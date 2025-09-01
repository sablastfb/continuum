import { FederatedMouseEvent, Graphics, Point } from "pixi.js";
import { MinimumDistanceToNextLine } from "../../data/constants/CanvasConstants";
import { Distance } from "../utils/CanvasUtils";
import { CanvasPalet } from "../../data/container/PaletContainer";
import { ThicknesPalet } from "../../data/container/ThickneContainer";
import useCanvasStore from "../../data/store/CanvasStore";
import { usePencileStore } from "../../data/store/PencileStore";
import { CanvasCursor } from "../service/Cursor";
import { CanvasViewport } from "../service/Viewport";
import { ITool } from "./ToolManager";
import { Canvas } from "../CanvasApp";
import { ILine } from "../service/Line/LineStrategyManager";

export class Pencile implements ITool {
  private curve: Graphics | null = null;
  private lineStrategy: ILine | null = null;

  constructor() {}

  public startDrawing(e: FederatedMouseEvent) {
    if (e.button === 1) return;
    if (!CanvasViewport.viewport) return;
    const worldPos = CanvasViewport.viewport.toWorld(e.global);
    this.curve = new Graphics();

    this.curve.stroke({
      color: "red",
      cap: "round",
      join: "round",
    });
    CanvasViewport.viewport.addChild(this.curve);

    const color = usePencileStore.getState().pencilColorId;

    this.curve
      .circle(
        worldPos.x,
        worldPos.y,
        ThicknesPalet.getThicknes(usePencileStore.getState().thicknesId)
      )
      .fill("white");
    this.curve.moveTo(worldPos.x, worldPos.y);

    this.curve.tint = CanvasPalet.getColor(color);

    this.lineStrategy = Canvas.lineStrategy.getActiveStrategy("bezier");
    this.lineStrategy?.startNewLine();
  }

  public draw(e: FederatedMouseEvent) {
    if (this.curve === null) return;
    if (!CanvasViewport.viewport) return;
    const out = this.lineStrategy?.updateLinePoistion(e, this.curve);

    if (out?.needNew) {
      this.curve.stroke({
        width:
          ThicknesPalet.getThicknes(usePencileStore.getState().thicknesId) * 2,
        color: "white",
        cap: "round",
        join: "round",
      });
    }
    const color = usePencileStore.getState().pencilColorId;
    this.curve.tint = CanvasPalet.getColor(color);
  }

  public stopDrawing() {}

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
