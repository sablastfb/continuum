import { FederatedMouseEvent } from "pixi.js";
import { ITool } from "./ITool";
import { CanvasCursor } from "../service/Cursor";
import { CanvasPalet } from "../../data/container/PaletContainer";
import { usePencileStore } from "../../data/store/PencileStore";
import useCanvasStore from "../../data/store/CanvasStore";
import { ThicknesPalet } from "../../data/container/ThickneContainer";

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
        const lineWidth = 1;
        const outlineWidth = 1;
        const color = "red";
    
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