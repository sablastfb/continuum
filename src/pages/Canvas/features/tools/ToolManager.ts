import { Pencile } from "./Pencile";
import { Erase } from "./Erase";
import useCanvasStore from "../../data/store/CanvasStore";
import { FederatedMouseEvent } from "pixi.js";
import { Exception } from "sass-embedded";

export type ITool = Partial<{
  type: ToolType;
  initTool(): void;
  disposeTool(): void;
  startDrawing(e: FederatedMouseEvent): void;
  draw(e: FederatedMouseEvent): void;
  stopDrawing(e: FederatedMouseEvent): void;
  updateCursor(): void;
}>;

export type ToolType =
  | "base"
  | "drawing"
  | "eraser"
  | "transform-move"
  | "transform-pan"
  | "shapes-square"
  | "shapes-circle"
  | "text"
  | "image";

export namespace Continuum.ToolManager {
  export const tools: Map<ToolType, ITool> = new Map();
  export let currentTool: ITool | null = null;

  export function setUpToolManager() {
    registerDefaultTools();
    setTool(useCanvasStore.getState().activeTool);
  }

  export function registerDefaultTools() {
    Continuum.ToolManager.tools.set("drawing", new Pencile());
    Continuum.ToolManager.tools.set("eraser", new Erase());
  }

  export function getCurrentTool() {
    if (currentTool === null)return new Pencile();
    return currentTool;
  }

  export function setTool(toolType: ToolType) {
    debugger;
    if (!Continuum.ToolManager.tools.has(toolType)) {
      return;
    }
    if (currentTool?.type === toolType) return;
    if (currentTool && currentTool.disposeTool) {
      currentTool.disposeTool();
    }
    currentTool = tools.get(toolType) ?? null;
    if (currentTool?.initTool) {
      currentTool.initTool();
    }

    return currentTool;
  }
}
