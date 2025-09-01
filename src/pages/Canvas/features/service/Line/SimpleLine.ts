import { FederatedMouseEvent, Graphics, Point } from "pixi.js";
import { ILine, LineUpdate } from "./LineStrategyManager";
import { CanvasViewport } from "../Viewport";
import { Distance } from "../../utils/CanvasUtils";
import { MinimumDistanceToNextLine } from "../../../data/constants/CanvasConstants";

export class SimpleLine implements ILine {
  private lastPoint: Point | null = null;

  startNewLine() {
    this.lastPoint = null;
  }

  startLine() {}

  updateLinePoistion(e: FederatedMouseEvent, curve: Graphics): LineUpdate {
    if (!CanvasViewport.viewport) return { needNew: false };

    const worldPos = CanvasViewport.viewport.toWorld(e.global);

    this.lastPoint = new Point(worldPos.x, worldPos.y);
    curve.lineTo(worldPos.x, worldPos.y);

    return { needNew: true };
  }
 
}
