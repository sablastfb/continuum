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

export type Theme = "dark" | "light";

export type BackgroundTypes = "color" | "grid" | "dots" | "line";

export type BackgroundSettings = {
  type: BackgroundTypes;
  color: ColorId;
  grid: {
    bacgroundColor: ColorId;
    gridColor: ColorId;
    size: number;
    width: number;
  };
  dots: {
    bacgroundColor: ColorId;
    dotColor: ColorId;
    radius: number;
    width: number;
  };
  line: {
    bacgroundColor: ColorId;
    lineColor: ColorId;
    width: number;
  };
  backgroundColors: ColorId[];
};

export type LayoutPositon = "top" | "bottom" | "left" | "right";

export interface CanvasSettings {
  layout: {
    toolButtons: LayoutPositon;
    toolMenue: LayoutPositon;
  };
  theme: Theme;
  background: BackgroundSettings;
  pencile: {
    colors: ColorId[];
    thicknes: ThicknesId[];
  };
}

export interface CanvasStore {
  canvasSettings: CanvasSettings;
  zoome: number;
  settingVisible: boolean;
  infoVisible: boolean;
  exportVisible: boolean;
  activeTool: ToolType;
  canvasCursorActive: boolean;
  setZoom: (zoom: number) => void;
  setSettingVisible: (visible: boolean) => void;
  setInfoVisible: (visible: boolean) => void;
  setExportVisible: (visible: boolean) => void;
  setActiveTool: (activeTool: ToolType) => void;
  setCanvasCursorActive: (canvasCursorActive: boolean) => void;
  addColor: (color: ColorId) => void;
  setBackgroundSettings: (
    bacgroundSettings: DeepPartial<BackgroundSettings>
  ) => void;
  discardSettings: (settings: CanvasSettings) => void;
  reserToDefaultSettings: () => void;
  setTheme: (theme: Theme) => void;
  setLayoutToolsMenue: (positon: LayoutPositon) => void;
  setLayoutToolsButton: (positon: LayoutPositon) => void;
}

export type Color = string;
export type ColorId = (typeof PaletContainer)[number]["id"];

export type Thicknes = number;
export type ThicknesId = (typeof ThicknesConstants)[number]["id"];
