import { Graphics, Point } from "pixi.js";
import { CanvasCursor } from "./Cursor";
import { graphiMap } from "../data/GraphicsDataManager";
import { CanvasViewport } from "./Viewport";
import { Convexhull } from "./Convex/ConvexHull";

export namespace CollisionDetection {
  let lastPoint: Point[] | null = null;
  export function Clear() {
    lastPoint = null;

    return;
  }
  /***
   *  Returns all graphic that are in contact with cursor
   */
  export function TestColisionWihtCursor(radius: number) {
    if (!CanvasViewport.viewport) return [];

    if (lastPoint === null) {
      const circlePosition = new Point(
        CanvasCursor.cursor.x,
        CanvasCursor.cursor.y
      );
      lastPoint = getCriclePoints({
        radius,
        circlePosition,
        numberOfPoints: 6,
      });
      return;
    }
    const circlePosition = CanvasViewport.viewport.toWorld(
      new Point(CanvasCursor.cursor.x, CanvasCursor.cursor.y)
    );

    const testPoints = getCriclePoints({
      radius,
      circlePosition,
      numberOfPoints: 6,
    });
    const graphis: Graphics[] = [];

    const dragedCircle = Convexhull.makeHull([...testPoints, ...lastPoint]);
    // const dragedCircle = testPoints;

    for (let g of graphiMap.values()) {
      const graph = g.graph;
      if (!graph || g.visible === false) continue;

      // Make sure you're using the same coordinate space
      const globalPosition = CanvasViewport.viewport.toWorld(
        new Point(g.path[0].x, g.path[0].y)
      );
      const intersection = CanvasCursor.cursor.containsPoint(globalPosition);

      CanvasViewport.viewport.addChild(
        new Graphics().circle(g.path[0].x, g.path[0].y, 1).fill("blue")
      );
      CanvasViewport.viewport.addChild(
        new Graphics()
          .circle(globalPosition.x, globalPosition.y, 1)
          .fill("blue")
      );
      if (intersection) {
        g.graph.tint = "red";
        break;
      }

      for (let i = 0; i < g.path.length - 1; i += 1) {
        const p1 = g.path[i];
        const p2 = g.path[i + 1];
        for (let j = 0; j < dragedCircle.length - 1; j += 1) {
          const p3 = dragedCircle[j];
          const p4 = dragedCircle[j + 1];
          const intersection = getLineIntersection(
            p1.x,
            p1.y,
            p2.x,
            p2.y,
            p3.x,
            p3.y,
            p4.x,
            p4.y
          );

          if (intersection) {
            //graphis.push(g);
            g.graph.tint = "red";
            break;
          }
        }
      }
    }

    lastPoint = [...testPoints];
    return graphis;
  }

  function getLineIntersection(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ) {
    const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

    // Lines are parallel
    if (denominator === 0) return null;

    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

    // Check if intersection is within the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return null;

    // Return intersection point
    return {
      x: x1 + ua * (x2 - x1),
      y: y1 + ua * (y2 - y1),
    };
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
