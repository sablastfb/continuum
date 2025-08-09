import { Viewport } from "pixi-viewport";
import { ITool } from "../ITool";
import { FederatedMouseEvent, Graphics } from "pixi.js";
import { Point } from "../../../data/CanvasTypes";
import { MinimumDistanceToNextLine } from "../../../data/CanvasConstants";
import { Distance } from "../../utils/CanvasUtils";
import { CanvasStore } from "./../../../data/CanvasStore";
import { StoreApi, UseBoundStore } from "zustand";
import { graphicsData } from "../../service/data";
import { v4 as uuidv4 } from "uuid";

export class Pencile implements ITool {
  private graphic: Graphics | null = null;
  private lastPoint: Point = { x: 0, y: 0 };
  private count = 0;

  constructor(
    private viewport: Viewport,
    private state: UseBoundStore<StoreApi<CanvasStore>>
  ) {}

  public startDrawing(e: FederatedMouseEvent) {
    const worldPos = this.viewport.toWorld(e.global);
    this.graphic = new Graphics();

    const guid: string = uuidv4();
    graphicsData.push({ id: guid, graph: this.graphic });

    this.graphic.moveTo(worldPos.x, worldPos.y);
    this.graphic.stroke({
      width: 10,
      color: "white",
      cap: "round",
      join: "round",
    });
    this.viewport.addChild(this.graphic);
    this.lastPoint = { x: worldPos.x, y: worldPos.y };
    this.count = 0;
  }

  public draw(e: FederatedMouseEvent) {
    if (this.graphic === null) return;
    const worldPos = this.viewport.toWorld(e.global) as Point;
    if (Distance(worldPos, this.lastPoint) < MinimumDistanceToNextLine) {
      return;
    }

    this.graphic.lineTo(worldPos.x, worldPos.y);
    this.graphic.stroke({
      width: this.state.getState().pencileThickens,
      color: "white",
      cap: "round",
      join: "round",
    });
    const color = this.state.getState().color;
    this.graphic.tint = color;
    this.count++;
    this.lastPoint = { x: worldPos.x, y: worldPos.y };
  }

  public stopDrawing() {
    // if (this.graphic === null) return;

    // const worldPos = this.viewport.toWorld(e.global) as Point;

    // this.graphic
    //   .lineTo(worldPos.x+1, worldPos.y)
    // this.graphic.stroke({
    //   width: this.state.getState().pencileThickens,
    //   color: "white",
    //   cap: "round",
    //   join: "round",
    // });
    // const color = this.state.getState().color;
    // this.graphic.tint = color;
  }

  public updateCursor(cursor: Graphics) {
    const lineDistanceOffset = 5;
    const outlineWidth = 1;
    const lineDistance = 20 + lineDistanceOffset;
    const lineWidth = 1;
    cursor.clear();
    cursor
      .circle(0, 0, this.state.getState().pencileThickens)
      .fill(this.state.getState().color)
      .stroke({ alignment: 0, width: outlineWidth, color: "black" })
      .moveTo(lineDistance, 0)
      .lineTo(this.state.getState().pencileThickens + lineDistanceOffset, 0)
      .moveTo(-lineDistance, 0)
      .lineTo(-this.state.getState().pencileThickens - lineDistanceOffset, 0)
      .moveTo(0, lineDistance)
      .lineTo(0, this.state.getState().pencileThickens + lineDistanceOffset)
      .moveTo(0, -lineDistance)
      .lineTo(0, -this.state.getState().pencileThickens - lineDistanceOffset)
      .stroke({ width: lineWidth, color: "gray" });
  }
}
