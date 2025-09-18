import { Graphics, Point } from "pixi.js";
import { ILine, LineUpdate } from "./LineStrategyManager";
import { CanvasViewport } from "../Viewport";
import { SimplePoint } from "../../../Types";

export class SimpleLine implements ILine {
  private lastPoint: Point | null = null;

  startNewLine<P extends SimplePoint>(e: P) {
    this.lastPoint = null;
  }

  updateLinePoistion<P extends SimplePoint>(e: P, curve: Graphics): LineUpdate {
    if (!CanvasViewport.viewport) return { needNew: false };

    const worldPos = CanvasViewport.viewport.toWorld(e);

    this.lastPoint = new Point(worldPos.x, worldPos.y);
    curve.lineTo(worldPos.x, worldPos.y);

    return { needNew: true };
  }
 
}
