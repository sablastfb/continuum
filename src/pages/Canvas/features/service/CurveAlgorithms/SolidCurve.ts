import { SimplePoint } from "../../../data/types/PointTypes";
import { Graphics } from "pixi.js";



// updates graphics to cursor 
  export class SolidCurve {

  public ConverseLineToPath<P extends SimplePoint>(line: P[], tolerance: number=  2) {
    const path = new paper.Path([...line]);
    if (line.length > 2){
      path.simplify(tolerance);
    }
    return path;
  }

  public CreatGraphicPath(paperPath: paper.Path, pathGraphics: Graphics| null) {
    if (!pathGraphics) pathGraphics = new Graphics();
    else {
      pathGraphics.clear();
    }
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
