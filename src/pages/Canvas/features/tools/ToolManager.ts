import { Curve } from "./Curve/Curve";
import { Erase } from "./Erase";
import { MouseInputPoint } from "../../data/types/Types";
import { FederatedPointerEvent } from "pixi.js";
import { throttle } from "lodash";
import { Shape } from "./Shape";
import { ToolType } from "../../data/types/ToolTypes";
import useToolStore from "../../data/store/ToolStore";

export type ITool = Partial<{
  type: ToolType;
  initTool(): void;
  disposeTool(): void;
  startDrawing<P extends MouseInputPoint>(e: P): void;
  draw<P extends MouseInputPoint>(e: P): void;
  stopDrawing<P extends MouseInputPoint>(e: P): void;
  updateCursor(): void;
}>;

export namespace Continuum_ToolManager {
 
  export const tools: Map<ToolType, ITool> = new Map();
  export let currentTool: ITool | null = null;

  export function init() {
    registerDefaultTools();
    setTool(useToolStore.getState().activeTool);
  }

  export function registerDefaultTools() {
    Continuum_ToolManager.tools.set("pen", new Curve('pen'));
    Continuum_ToolManager.tools.set("highlighter", new Curve('marker'));
    Continuum_ToolManager.tools.set("eraser", new Erase());
    Continuum_ToolManager.tools.set("shape", new Shape('circle'));
  }

  export function startDrawing<P extends MouseInputPoint>(e: P) {
    if (currentTool && currentTool.startDrawing) {
      currentTool.startDrawing(e);
    }
  }

  export function stopDrawing<P extends MouseInputPoint>(e: P) {
    if (currentTool && currentTool.stopDrawing) {
      currentTool.stopDrawing(e);
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

  export const draw = throttle((e: FederatedPointerEvent) => {
    if (currentTool && currentTool.draw) {
      currentTool.draw(e);
    }
  }, 8);
}
