import { FederatedMouseEvent, Graphics } from "pixi.js";

export interface ITool{
    startDrawing(e: FederatedMouseEvent): void;
    draw(e: FederatedMouseEvent): void;
    stopDrawing(e: FederatedMouseEvent): void;
    updateCursor(): void;
}