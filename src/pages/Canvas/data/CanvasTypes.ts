import { Graphics } from "pixi.js";
import { JSX } from "react";


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

export type BackgroundTypes = "color" | "grid" | "dots" | "line";

export type BackgroundSettings =  {
    type: BackgroundTypes;
    color: string;
    grid: {
        bacgroundColor: string;
        gridColor: string;
        size: number;
        width: number;
    };
    dots: {
        bacgroundColor: string;
        dotColor: string;
        radius: number;
        width: number;
    };
    line: {
        bacgroundColor: string;
        lineColor: string;
        width: number;
    };
}



export interface CanvasSettings {
  background: BackgroundSettings;
  pencile: {
    colors: string[];
    thicknes: number[];
  };
}

export interface CanvasStore {
  canvasSettings: CanvasSettings;
  color: string;
  zoome: number;
  settingVisible: boolean;
  infoVisible: boolean;
  exportVisible: boolean;
  activeTool: ToolType;
  pencileThickens: number;
  activeColorKey: number;
  canvasCursorActive: boolean;
  setZoom: (zoom: number) => void;
  setPencileColor: (newColor: {
    color: string;
    activeColorKey: number;
  }) => void;
  setSettingVisible: (visible: boolean) => void;
  setInfoVisible: (visible: boolean) => void;
  setExportVisible: (visible: boolean) => void;
  setActiveTool: (activeTool: ToolType) => void;
  setPencileThickens: (pencileThickens: number) => void;
  setCanvasCursorActive: (canvasCursorActive: boolean) => void;
  addColor: (color: string) => void;
  setBackgroundSettings: (bacgroundSettings: DeepPartial<BackgroundSettings>) => void;
  discardSettings: (settings: CanvasSettings) => void;
  reserToDefaultSettings: () => void;
}
