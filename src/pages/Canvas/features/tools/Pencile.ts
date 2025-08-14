import { Viewport } from "pixi-viewport";
import { FederatedMouseEvent, Graphics } from "pixi.js";
import { StoreApi, UseBoundStore } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { CanvasStore, Point } from "../../data/types/CanvasTypes";
import { MinimumDistanceToNextLine } from "../../data/constants/CanvasConstants";
import { Distance } from "../utils/CanvasUtils";
import { graphicsData } from "../service/data";
import { ITool } from "./ITool";
import { CanvasPalet } from "../../data/container/PaletContainer";
import { ThicknesPalet } from "../../data/container/ThickneContainer";
import useCanvasStore from "../../data/store/CanvasStore";
import { usePencileStore } from "../../data/store/PencileStore";

export class Pencile implements ITool {
  private graphic: Graphics | null = null;
  private lastPoint: Point = { x: 0, y: 0 };
  private count = 0;

  constructor(
    private viewport: Viewport,
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
      width: ThicknesPalet.getThicknes(usePencileStore.getState().thicknesId)*2,
      color: "white",
      cap: "round",
      join: "round",
    });
    const color = usePencileStore.getState().pencilColorId;
    this.graphic.tint = CanvasPalet.getColor(color);
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
    const outlineWidth = 1;
    const lineWidth = 1;
    const zoom = useCanvasStore.getState().zoome;
    const thicknes = zoom* ThicknesPalet.getThicknes(
      usePencileStore.getState().thicknesId
    );
    const lineDistanceOffset = thicknes;
    const lineDistance = 20*zoom + lineDistanceOffset;
    cursor.clear();
    cursor
      .circle(0, 0, thicknes)
      .fill(CanvasPalet.getColor(usePencileStore.getState().pencilColorId))
      .stroke({ alignment: 0, width: outlineWidth, color: "black" })
      .moveTo(lineDistance, 0)
      .lineTo(thicknes + lineDistanceOffset, 0)
      .moveTo(-lineDistance, 0)
      .lineTo(-thicknes - lineDistanceOffset, 0)
      .moveTo(0, lineDistance)
      .lineTo(0, thicknes + lineDistanceOffset)
      .moveTo(0, -lineDistance)
      .lineTo(0, -thicknes - lineDistanceOffset)
      .stroke({ width: lineWidth, color: "gray" });
  }
}
