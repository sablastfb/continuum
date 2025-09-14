import { Graphics, Point } from "pixi.js";

export type Id = string;

export type GraphicsData = {
  id: Id;
  graph: Graphics;
  path: Point[];
  visible: boolean;
};


export const graphiMap = new Map<Id, GraphicsData>();
