import { Graphics } from "pixi.js";
import { JSX } from "react";

export type Id = string;

export type GraphicsData = {
  id: Id,
  graph: Graphics
}

export type IconOption = { 
  name: string;
  icon: JSX.Element;
  action: ToolType;
}


export type Point = {
  x: number;
  y: number;
};

export type ToolType =
  | "drawing"
  | "eraser"
  | "move"
  | "transform"
  | "square"
  | "circle"
  | "text";
