import { Graphics } from "pixi.js";
import { SimplePoint } from "../../data/types/PointTypes";
import { Continuum_Canvas } from "../CanvasApp";


export namespace Continuum_Debug {
  export function DrawLine<P extends SimplePoint>(pointX: P, pointY: P) {
    const line = new Graphics();
    line
      .circle(pointX.x, pointX.y, 5)
      .fill("red")
      .circle(pointY.x, pointY.y, 5)
      .fill("blue")
      .moveTo(pointX.x, pointX.y)
      .lineTo(pointY.x, pointY.y)
      .stroke({ color: "green" });
    Continuum_Canvas.viewportManager.viewport?.addChild(line);
  }

  export function DrawPath<P extends SimplePoint>(
    path: P[],
    color: string = "red"
  ) {
    if (path.length === 0) return;
    const g = new Graphics();
    const firstPoint = path[0];
    g.moveTo(firstPoint.x, firstPoint.y);

    for (let i = 1; i < path.length; i++) {
      const currentPoint = path[i];
      g.lineTo(currentPoint.x, currentPoint.y);
    }
    g.stroke({ color, width: 1 });
    Continuum_Canvas.viewportManager.viewport?.addChild(g);
  }

}
