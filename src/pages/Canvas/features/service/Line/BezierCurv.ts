import { FederatedMouseEvent, Graphics, Point } from "pixi.js";
import { ILine, LineUpdate } from "./LineStrategyManager";
import { CanvasViewport } from "../Viewport";

export class Bezier implements ILine {
  private lastPoints: Point[] = [];

  startNewLine() {
    this.lastPoints = [];
  }

  updateLinePoistion(e: FederatedMouseEvent, curve: Graphics): LineUpdate {
    if (!CanvasViewport.viewport) return { needNew: false };

    const worldPos = CanvasViewport.viewport.toWorld(e.global);
    
    this.lastPoints.push(new Point(worldPos.x, worldPos.y));
    while (this.lastPoints.length > 4) this.lastPoints.shift();
    const controlPoints = this.craeteBezierParameters();
    if (this.lastPoints.length === 4) {
      curve.bezierCurveTo(
        controlPoints[0],
        controlPoints[1],
        controlPoints[2],
        controlPoints[3],
        controlPoints[4],
        controlPoints[5],
        1.0
      );
      return { needNew: true };
    }

    return { needNew: false };
  }

  private craeteBezierParameters() {
    const p0 = this.lastPoints[0];
    const p1 = this.lastPoints[1];
    const p2 = this.lastPoints[2];
    const p3 = this.lastPoints[3];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;

    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    return [cp1x, cp1y, cp2x, cp2y, p2.x, p2.y];
  }
}
