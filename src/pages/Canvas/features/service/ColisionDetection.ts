import { Graphics, Point } from "pixi.js";
import { CanvasCursor } from "./Cursor";
import { graphiMap } from "../data/GraphicsDataManager";
import { CanvasViewport } from "./Viewport";

export namespace CollisionDetection {

  let lastPoint: Point| null = null;
  export function Clear(){
    lastPoint = null;
    return ;
  }
  /***
   *  Returns all graphic that are in contact with cursor
   */
  export function TestColisionWihtCursor(radius: number) {
    if (!CanvasViewport.viewport) return [];

    if (lastPoint === null){
      lastPoint = 
      new Point(CanvasCursor.cursor.x, CanvasCursor.cursor.y)
      return;
    }
    const circlePosition = CanvasViewport.viewport.toWorld(
      new Point(CanvasCursor.cursor.x, CanvasCursor.cursor.y)
    );

    const testPoints = getCriclePoints({
      radius,
      circlePosition,
      numberOfPoints: 15,
    });

    const graphis = [];
    for (let g of graphiMap.values()) {
      const graph = g.graph;
      if (!graph || g.visible === false) continue;
      for (const point of testPoints) {
        if (graph.containsPoint(point)) {
          graphis.push(g);
        }
      }
    }
    return graphis;
  }

  /**
   * Return list of points around circle
   */

  interface CirclePointsConfig {
    numberOfPoints: number;
    radius: number;
    circlePosition: Point;
  }
  export function getCriclePoints(config: CirclePointsConfig) {
    const { numberOfPoints, radius, circlePosition } = config;
    const points: Point[] = [];
    for (let i = 0; i < numberOfPoints; i += 1) {
      const alpha = (i / numberOfPoints) * 2 * Math.PI;
      const X = Math.cos(alpha) * radius;
      const Y = Math.sin(alpha) * radius;
      const point = new Point(X + circlePosition.x, Y + circlePosition.y);
      points.push(point);
    }

    return points;
  }
}
