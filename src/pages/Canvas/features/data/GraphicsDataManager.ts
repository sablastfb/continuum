import { Graphics } from "pixi.js";
import { CurveGraphicInfo } from "./CurveGraphicInfo";

export type Id = string;

export type GraphicsData = {
  id: Id;
  type: GraphicType;
  graph: Graphics;
  visible: boolean;
  graphicInfo: GraphicInfo
};


export const graphicOnCanvas = new Map<Id, GraphicsData>();


export type GraphicInfo = CurveGraphicInfo;
export type GraphicType = 'cruve';