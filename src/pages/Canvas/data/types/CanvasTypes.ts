import { JSX } from "react";
import { PaletContainer } from "../constants/PaletConstants";
import { ThicknesConstants } from "../constants/ThicknesConstants";
import { ToolType } from "../../features/tools/ToolManager";

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;


export type IconOption = {
  icon: JSX.Element;
  action: ToolType;
};

export type Point = {
  x: number;
  y: number;
};

export type Color = string;
export type ColorId = (typeof PaletContainer)[number]["id"];

export type Thicknes = number;
export type ThicknesId = (typeof ThicknesConstants)[number]["id"];
