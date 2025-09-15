import { Graphics } from "pixi.js";
import { CanvasViewport } from "../Viewport";
import { Simplify } from "simplify-ts";

export namespace Continum.Debug {
  type SimplePoint = {
    x: number;
    y: number;
  };
  /**
   *  Draws path to viewport
   *
   * @param path list of points
   * @param color color of  line
   */
  export function PathCalu<P extends SimplePoint>(
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
    CanvasViewport.viewport?.addChild(g);
  }

  export function PathSimTest<P extends SimplePoint>(path: P[]) {
    for (let i = 0; i < 10; i += 1) {
      const simplePath = Simplify(path, i*3, false);
      PathCalu(simplePath, getColorFromGradient(i, 0, 10));
      console.log(i, path.length, simplePath.length);
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
}
