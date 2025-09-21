import { ICurveStyle } from "./Curve";

export class PencileStyle implements ICurveStyle {
  draw(info: any): void {
    info.activeCurve.stroke({
      width: info.activeThicknes * 2,
      color: "white",
      cap: "round",
      join: "round",
    });
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
      width: info.activeThicknes * 2,
      color: "white",
      cap: "round",
      join: "round",
    });
    info.optimizedCruveGraphics.tint = info.activeColor;
  }
}
