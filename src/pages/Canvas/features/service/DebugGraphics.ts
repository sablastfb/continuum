import { Graphics } from "pixi.js";
import { Simplify } from "simplify-ts";
import { SimplePoint } from "../../Types";
import { Continuum_CanvasViewport } from "./Viewport";


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
    Continuum_CanvasViewport.viewport?.addChild(line);
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
    Continuum_CanvasViewport.viewport?.addChild(g);
  }

  export function SimplePathOptmizationTest<P extends SimplePoint>(path: P[]) {
    for (let i = 0; i < 10; i += 1) {
      const simplePath = Simplify(path, i * 3, false);
      DrawPath(simplePath, getColorFromGradient(i, 0, 10));
    }
  }

  function getColorFromGradient(
    value: number,
    min: number = 0,
    max: number = 10
  ): string {
    const clampedValue = Math.max(min, Math.min(max, value));

    const normalized = (clampedValue - min) / (max - min);
    const r = Math.floor(255 * (1 - normalized));
    const g = 0;
    const b = Math.floor(255 * normalized);

    return `rgb(${r}, ${g}, ${b})`;
  }

  export function GetRandomRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }
}
