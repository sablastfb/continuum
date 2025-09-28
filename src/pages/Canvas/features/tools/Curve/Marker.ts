import { ICurveStyle } from "./Curve";

export class MarkerStyle implements ICurveStyle {
  draw(info: any): void {
    info.activeCurve.stroke({
      width: info.activeThicknes * 10,
    });
    info.activeCurve.tint = info.activeColor;
    info.activeCurve.alpha = 0.5;
  }

  stopDrawingStyle(info: any): void {
    if (info.line.length == 2) {
      const firstCurve = info.optimizedPath.curves[0];
      const firstPoint = firstCurve.point1;
      if (firstPoint) {
        info.optimizedCruveGraphics
          .circle(firstPoint.x, firstPoint.y, info.activeThicknes)
          .fill("white");
      }
    }
    info.optimizedCruveGraphics.stroke({
      width: info.activeThicknes * 10,
      join: "round",
    });

    info.optimizedCruveGraphics.alpha = 0.5;
    info.optimizedCruveGraphics.tint = info.activeColor;
  }
}
