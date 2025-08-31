import { ITool } from "./ITool";
import { Pencile } from "./Pencile";
import { Erase } from "./Erase";
import useCanvasStore from "../../data/store/CanvasStore";

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
    this.currentTool = this.tools.get(toolType) ?? null;
    return this.currentTool;
  }
}
