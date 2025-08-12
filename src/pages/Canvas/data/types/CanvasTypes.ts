import { Graphics } from "pixi.js";
import { JSX } from "react";
import { PaletContainer } from "../constants/PaletConstants";


export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;


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

export type Theme = 'dark' | 'light';

export type BackgroundTypes = "color" | "grid" | "dots" | "line";

export type BackgroundSettings =  {
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
}

export interface CanvasSettings {
  theme: Theme,
  background: BackgroundSettings;
  pencile: {
    colors: ColorId[];
    thicknes: number[];
  };
}

export interface CanvasStore {
  canvasSettings: CanvasSettings;
  zoome: number;
  pencilColor: ColorId;
  settingVisible: boolean;
  infoVisible: boolean;
  exportVisible: boolean;
  activeTool: ToolType;
  pencileThickens: number;
  canvasCursorActive: boolean;
  setZoom: (zoom: number) => void;
  setPencileColor: (newColor: {
    color: ColorId;
  }) => void;
  setSettingVisible: (visible: boolean) => void;
  setInfoVisible: (visible: boolean) => void;
  setExportVisible: (visible: boolean) => void;
  setActiveTool: (activeTool: ToolType) => void;
  setPencileThickens: (pencileThickens: number) => void;
  setCanvasCursorActive: (canvasCursorActive: boolean) => void;
  addColor: (color: ColorId) => void;
  setBackgroundSettings: (bacgroundSettings: DeepPartial<BackgroundSettings>) => void;
  discardSettings: (settings: CanvasSettings) => void;
  reserToDefaultSettings: () => void;
  setTheme: (theme: Theme) => void;
}

export type Color = string;
export type ColorId = (typeof PaletContainer)[number]["id"];