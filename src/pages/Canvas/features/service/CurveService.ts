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
    if (line.length > 2)
    path.simplify(2);
    // PrintDiff(line, path);
    return path;
  }

  function PrintDiff<P extends SimplePoint>(line: P[], path: paper.Path) {
    const newSegmentCount = path.segments.length;
    const segmentCount = line.length;
    const difference = segmentCount - newSegmentCount;
    const percentage = 100 - Math.round((newSegmentCount / segmentCount) * 100);
    console.log(
      difference +
        " of the " +
        segmentCount +
        " segments were removed. Saving " +
        percentage +
        "%"
    );
  }

  export function CreatGrahicPath(paperPath: paper.Path) {
    const pathGraphics = new Graphics();

    const segments = paperPath.segments;
    pathGraphics.moveTo(segments[0].point.x, segments[0].point.y);

    for (let i = 1; i < segments.length; i++) {
      const seg = segments[i];
      const prevSeg = segments[i - 1];
      const cp1 = prevSeg.point.add(prevSeg.handleOut);
      const cp2 = seg.point.add(seg.handleIn);
      if (prevSeg.handleOut && seg.handleIn) {
        pathGraphics.bezierCurveTo(
          cp1.x,
          cp1.y,
          cp2.x,
          cp2.y,
          seg.point.x,
          seg.point.y
        );
      } else {
        pathGraphics.lineTo(seg.point.x, seg.point.y);
      }
    }
    return pathGraphics;
  }
}
