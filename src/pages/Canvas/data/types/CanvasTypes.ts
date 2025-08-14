import { Graphics } from "pixi.js";
import { JSX } from "react";
import { PaletContainer } from "../constants/PaletConstants";
import { ThicknesConstants } from "../constants/ThicknesConstants";

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type Id = string;

export type GraphicsData = {
  id: Id;
  graph: Graphics;
};

export type IconOption = {
  name: string;
  icon: JSX.Element;
  action: ToolType;
};

export type Point = {
  x: number;
  y: number;
};

export type ToolType =
  | "marker"
  | "drawing"
  | "eraser"
  | "move"
  | "transform"
  | "square"
  | "circle"
  | "text"
  | "image";

export type Color = string;
export type ColorId = (typeof PaletContainer)[number]["id"];

export type Thicknes = number;
export type ThicknesId = (typeof ThicknesConstants)[number]["id"];
