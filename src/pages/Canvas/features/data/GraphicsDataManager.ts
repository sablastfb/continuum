import { Graphics } from "pixi.js";
import { CurveGraphicInfo } from "./CurveGraphicInfo";
import { Continuum_Canvas } from "../CanvasApp";
import { v4 as uuidv4 } from "uuid";

export type Id = string;

export type GraphicsData = {
  id: Id;
  type: GraphicType;
  graph: Graphics;
  visible: boolean;
  graphicInfo: GraphicInfo;
};

export const graphicOnCanvas = new Map<Id, GraphicsData>();

export type GraphicInfo = CurveGraphicInfo;
export type GraphicType = "cruve";

export namespace Continuum_Data {
  ///
  export function add(graphics: Graphics) {
    
  }
}
