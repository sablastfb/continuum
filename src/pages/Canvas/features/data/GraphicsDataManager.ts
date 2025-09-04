import { Graphics } from "pixi.js";

export type Id = string;

export type GraphicsData = {
  id: Id;
  graph: Graphics;
  visible: boolean;
};


export const graphiMap = new Map<Id, GraphicsData>();
