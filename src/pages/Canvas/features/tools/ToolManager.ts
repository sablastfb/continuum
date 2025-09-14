import { Pencile } from "./Pencile";
import { Erase } from "./Erase";
import useCanvasStore from "../../data/store/CanvasStore";
import { FederatedMouseEvent } from "pixi.js";


export type ITool = Partial<{
    type:ToolType;
    initTool(): void;
    disposeTool(): void;
    startDrawing(e: FederatedMouseEvent): void;
    draw(e: FederatedMouseEvent): void;
    stopDrawing(e: FederatedMouseEvent): void;
    updateCursor(): 
    void;
}>;


export type ToolType =
  | 'base'
  | "drawing"
  | "eraser"
  | "transform-move"
  | "transform-pan"
  | "shapes-square"
  | "shapes-circle"
  | "text"
  | "image";

export class ToolsManager {
  private tools: Map<ToolType, ITool> = new Map();
  private currentTool: ITool | null = null;

  constructor(
  ) {
    this.registerDefaultTools();
    this.setTool(useCanvasStore.getState().activeTool);
  }

  private registerDefaultTools(){
    this.registerDefaultTool('drawing', new Pencile());
    this.registerDefaultTool('eraser', new Erase());
  }
  
  private registerDefaultTool(toolType: ToolType, tool: ITool){
    this.tools.set(toolType, tool);
  }

  public getCurrentTool(){
    return this.currentTool; 
  }

  setTool(toolType: ToolType) {
    if (!this.tools.has(toolType)) {
      throw new Error(`Tool ${toolType} not registered`);
    }
    if(this.currentTool?.type === toolType) return;
    if(this.currentTool && this.currentTool.disposeTool){
      this.currentTool.disposeTool();
    }
    this.currentTool = this.tools.get(toolType) ?? null;
    if (this.currentTool?.initTool){
      this.currentTool.initTool();
    }

    return this.currentTool;
  }
}
