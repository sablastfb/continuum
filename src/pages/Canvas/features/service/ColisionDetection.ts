import { System } from "detect-collisions";
import { SimplePoint } from "../../data/types/PointTypes";
import {
  GraphicInfo,
  graphicOnCanvas,
  GraphicsData,
} from "../data/GraphicsDataManager";
import { Continuum_CurveService } from "./CurveService";
import { Continuum_Math } from "./MathUtils";

export namespace Continuum_CollisionService {
  export const colisionSystem = new System();

  /**
   *  Track colsion detecton for fast moving object.
   *  Check if path betwen last and current point hit graphics
   */
  const lastPoint: SimplePoint = { x: 0, y: 0 };

  export function StartContinouseColison<P extends SimplePoint>(point: P) {
    lastPoint.x = point.x;
    lastPoint.y = point.y;
  }

  export function GetContinouseColison<P extends SimplePoint>(activePoint: P) {
    const diffPath = Continuum_CurveService.ConverseLineToPath([
      lastPoint,
      activePoint,
    ]);
    const graphics: GraphicsData[] = [];

    for (const g of graphicOnCanvas.values()) {
      if (g.visible === false) continue;
      const pointOfCurve = g.graphicInfo.path.getIntersections(diffPath);
      if (pointOfCurve.length > 0) {
        graphics.push(g);
      }
    }

    lastPoint.x = activePoint.x;
    lastPoint.y = activePoint.y;

    return graphics;
  }

  export function GetAllGraphicAroundPoint<P extends SimplePoint>(
    radius: number,
    point: P
  ) {
    const graphics: GraphicsData[] = [];
    for (const g of graphicOnCanvas.values()) {
      if (g.visible === false) continue;
      let colision = false;
      switch (g.type) {
        case "cruve":
          colision = CurveColision(g.graphicInfo, radius, point);
      }

      if (colision === true) {
        graphics.push(g);
      }
    }
    return graphics;
  }

  function CurveColision<P extends SimplePoint>(
    graphicInfo: GraphicInfo,
    radius: number,
    point: P
  ) {
    const pointOfCurve = graphicInfo.path.getNearestPoint(point);
    if (!pointOfCurve) return false;

    const dist = Continuum_Math.Distance(point, {
      x: pointOfCurve.x,
      y: pointOfCurve.y,
    });
    if (dist <= radius + graphicInfo.thickness / 2) {
      return true;
    }
    return false;
  }
}
