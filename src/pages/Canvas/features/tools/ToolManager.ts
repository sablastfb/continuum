import { Pencile } from "./Pencile";
import { Erase } from "./Erase";
import useCanvasStore from "../../data/store/CanvasStore";
import { FederatedMouseEvent } from "pixi.js";
import { Exception } from "sass-embedded";
import { MouseInputPoint } from "../../Types";

export type ITool = Partial<{
  type: Continuum_ToolManager.ToolType;
  initTool(): void;
  disposeTool(): void;
  startDrawing<P extends MouseInputPoint>(e: P): void;
  draw<P extends MouseInputPoint>(e: P): void;
  stopDrawing<P extends MouseInputPoint>(e: P): void;
  updateCursor(): void;
}>;

export namespace Continuum_ToolManager {
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

  export const tools: Map<ToolType, ITool> = new Map();
  export let currentTool: ITool | null = null;

  export function setUpToolManager() {
    registerDefaultTools();
    setTool(useCanvasStore.getState().activeTool);
  }

  export function registerDefaultTools() {
    Continuum_ToolManager.tools.set("drawing", new Pencile());
    Continuum_ToolManager.tools.set("eraser", new Erase());
  }

  export function startDrawing<P extends MouseInputPoint>(e: P) {
    if (currentTool && currentTool.startDrawing) {
      currentTool.startDrawing(e);
    }
  }

    export function draw<P extends MouseInputPoint>(e: P) {
    if (currentTool && currentTool.draw) {
      currentTool.draw(e);
    }
  }

  export function getCurrentTool() {
    if (currentTool === null) return null;
    return currentTool;
  }

  export function updateCursor() {
    if (currentTool === null) return null;
    if (currentTool && currentTool.updateCursor) {
      currentTool.updateCursor();
    }
  }

  export function setTool(toolType: ToolType) {
    if (!Continuum_ToolManager.tools.has(toolType)) {
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
