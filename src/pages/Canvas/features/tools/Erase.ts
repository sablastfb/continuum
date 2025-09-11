import { FederatedMouseEvent, Graphics } from "pixi.js";
import { CanvasCursor } from "../service/Cursor";
import { CanvasPalet } from "../../data/container/PaletContainer";
import useCanvasStore from "../../data/store/CanvasStore";
import { ThicknesPalet } from "../../data/container/ThickneContainer";
import { ITool, ToolType } from "./ToolManager";
import { useEraseStore } from "../../data/store/EraseStore";
import { CanvasViewport } from "../service/Viewport";
import { graphiMap } from "../data/GraphicsDataManager";
import { ILine, LineUpdate } from "../service/Line/LineStrategyManager";
import { Canvas } from "../CanvasApp";

export class Erase implements ITool {
  stopDrawing(e: FederatedMouseEvent): void {
    throw new Error("Method not implemented.");
  }
  type: ToolType = "draw-eraser";
  private curve: Graphics | null = null;
  private lineStrategy: ILine | null = null;

  initTool(): void {
    for (const c of graphiMap.values()) {
      c.graph.interactive = true;
      c.graph.on("mousemove", () => {});
    }
  }
  
  startDrawing(e: FederatedMouseEvent): void {
    if (e.button !== 0) return;
    if (!CanvasViewport.viewport) return;

    this.curve = new Graphics();
    this.lineStrategy = Canvas.lineStrategy.getActiveStrategy("bezier");
    this.lineStrategy?.startNewLine(e);
  }

  draw(e: FederatedMouseEvent): void {
    if (this.curve === null) return;

  }
  
  updateCursor(): void {
    const eraseMethod = useEraseStore.getState().eraseMethod;
    const zoom = useCanvasStore.getState().zoome;
    if (eraseMethod === "soft") {
      const radius =
        zoom * ThicknesPalet.getThicknes(useEraseStore.getState().thicknesId);
      CanvasCursor.cursor.clear();
      CanvasCursor.cursor
        .circle(0, 0, radius)
        .fill({ color: CanvasPalet.getColor("c-1"), alpha: 0.5 })
        .stroke({ width: 1, color: CanvasPalet.getColor("c-1") });
    } else if (eraseMethod === "strong") {
      const radius =
        zoom * ThicknesPalet.getThicknes(useEraseStore.getState().thicknesId);
      CanvasCursor.cursor.clear();
      CanvasCursor.cursor
        .circle(0, 0, radius)
        .fill({ color: CanvasPalet.getColor("c-1") });
    }
  }
}
