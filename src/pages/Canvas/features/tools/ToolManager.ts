import { Curve } from "./Curve/Curve";
import { Erase } from "./Erase";
import { FederatedPointerEvent } from "pixi.js";
import { throttle } from "lodash";
import { ToolType } from "../../data/types/ToolTypes";
import useToolStore from "../../data/store/ToolStore";
import type { MouseInputPoint, SimplePoint } from "../../data/types/PointTypes";
import { Continuum_Canvas } from "../CanvasApp";
import { InputState } from "../input/InputState";

export type ITool = Partial<{
  type: ToolType;
  initTool(): void;
  disposeTool(): void;
  startDrawing(e: InputState): void;
  draw(simpe: InputState): void;
  stopDrawing(e: InputState): void;
  updateCursor(): void;
}>;

export class Continuum_ToolManager {
  public static tools: Map<ToolType, ITool> = new Map();
  public static currentTool: ITool | null = null;

  public static init() {
    Continuum_ToolManager.registerDefaultTools();
    Continuum_ToolManager.setTool(useToolStore.getState().activeTool);
  }

  public static registerDefaultTools() {
    Continuum_ToolManager.tools.set("pen", new Curve('pen'));
    Continuum_ToolManager.tools.set("highlighter", new Curve('marker'));
    Continuum_ToolManager.tools.set("eraser", new Erase());
    // Continuum_ToolManager.tools.set("shape", new Shape('circle'));
  }

  public static startDrawing<P extends MouseInputPoint>(e: P) {
    if (Continuum_ToolManager.currentTool && 
      Continuum_ToolManager.currentTool.startDrawing) {
      Continuum_ToolManager.currentTool.startDrawing(e);
    }
  }

 public static stopDrawing<P extends MouseInputPoint>(e: P) {
    if (Continuum_ToolManager.currentTool && Continuum_ToolManager.currentTool.stopDrawing) {
      Continuum_ToolManager.currentTool.stopDrawing(e);
    }
  }

  public static getCurrentTool() {
    if (Continuum_ToolManager.currentTool === null) return null;
    return Continuum_ToolManager.currentTool;
  }

  public static updateCursor() {
    if (Continuum_ToolManager.currentTool === null) return null;
    if (Continuum_ToolManager.currentTool && Continuum_ToolManager.currentTool.updateCursor) {
      Continuum_ToolManager.currentTool.updateCursor();
    }
  }

  public static setTool(toolType: ToolType) {
    if (!Continuum_ToolManager.tools.has(toolType)) {
      return;
    }
    if (Continuum_ToolManager.currentTool?.type === toolType) return;
    if (Continuum_ToolManager.currentTool && Continuum_ToolManager.currentTool.disposeTool) {
      Continuum_ToolManager.currentTool.disposeTool();
    }
    Continuum_ToolManager.currentTool = Continuum_ToolManager.tools.get(toolType) ?? null;
    if (Continuum_ToolManager.currentTool?.initTool) {
      Continuum_ToolManager.currentTool.initTool();
    }

    return Continuum_ToolManager.currentTool;
  }

  public static draw = throttle((e: FederatedPointerEvent) => {
    if (Continuum_ToolManager.currentTool && Continuum_ToolManager.currentTool.draw) {
      const canvas = Continuum_Canvas.appInstance?.canvas;
      if (!canvas) return
    const rect = canvas.getBoundingClientRect();
    
    // Calculate coordinates relative to canvas
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      Continuum_ToolManager.currentTool.draw(e, {x,y});
    }
  }, 8);
}
