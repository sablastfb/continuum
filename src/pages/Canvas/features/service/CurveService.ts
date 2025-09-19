/**
 * Interface for paper js
 * Use for optimizeing curvs, geting nearst points and outher useful curve stuff
 */

import { PaperScope } from "paper/dist/paper-core";
import { SimplePoint } from "../../Types";
import { Graphics } from "pixi.js";

export namespace Continuum_CurveService {
  export const paperScope = new PaperScope();

  export async function init() {
    const canvas = document.createElement("canvas");
    paperScope.setup(canvas);
  }
 
  export function ConverLineToPath<P extends SimplePoint>(line: P[]) {
    const path = new Continuum_CurveService.paperScope.Path([...line]);
    path.simplify(0.1);
    return path;
  }

  export function CreatGrahicPath(paperPath: paper.Path) {
    const pathGraphics = new Graphics();

    const segments = paperPath.segments;
    pathGraphics.moveTo(segments[0].point.x, segments[0].point.y);

    // Iterate through segments to draw lines or curves
    for (let i = 1; i < segments.length; i++) {
      const seg = segments[i];
      const prevSeg = segments[i - 1];
      const cp1 = prevSeg.point.add(prevSeg.handleOut);
      const cp2 = seg.point.add(seg.handleIn);
      // Check if the segment has Bézier handles
      if (prevSeg.handleOut && seg.handleIn) {
        // Draw a cubic Bézier curve
        pathGraphics.bezierCurveTo(
          cp1.x,
          cp1.y,
          cp2.x,
          cp2.y,
          seg.point.x,
          seg.point.y
        );
      } else {
        // Draw a straight line
        pathGraphics.lineTo(seg.point.x, seg.point.y);
      }
    }
    return pathGraphics;
  }
}
