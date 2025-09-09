import { FederatedMouseEvent } from "pixi.js";
import { CanvasCursor } from "../service/Cursor";
import { CanvasPalet } from "../../data/container/PaletContainer";
import { usePencileStore } from "../../data/store/PencileStore";
import useCanvasStore from "../../data/store/CanvasStore";
import { ThicknesPalet } from "../../data/container/ThickneContainer";
import { ITool } from "./ToolManager";
import { useEraseStore } from "../../data/store/EraseStore";

export class Erase implements ITool {
  startDrawing(e: FederatedMouseEvent): void {
    throw new Error("Method not implemented.");
  }
  draw(e: FederatedMouseEvent): void {
    throw new Error("Method not implemented.");
  }
  stopDrawing(e: FederatedMouseEvent): void {
    throw new Error("Method not implemented.");
  }
  updateCursor(): void {
    const eraseMethod = useEraseStore.getState().eraseMethod;
    const lineWidth = 1;
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
        .fill({ color:CanvasPalet.getColor("c-1")});
    }
  }
}
