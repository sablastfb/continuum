import { Graphics } from "pixi.js";

export type Id = string;

export type GraphicsData = {
  id: Id;
  graph: Graphics;
  path: paper.Path;
  visible: boolean;
  graphicInfo: GraphicInfo
};


export const graphiMap = new Map<Id, GraphicsData>();


export type GraphicInfo = {
  thicknes: number

}