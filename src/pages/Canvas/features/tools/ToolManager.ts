import { Viewport } from "pixi-viewport";
import { ITool } from "./ITool";
import { ToolType } from "../../data/types/CanvasTypes";
import { Pencile } from "./Pencile";

export class ToolsManager {
  private tools: Map<ToolType, ITool> = new Map();
  private currentTool: ITool | null = null;

  constructor(
    private viewport: Viewport,
    toolType: ToolType = 'drawing'
  ) {
    this.registerDefaultTools();
    this.setTool(toolType);
  }

  private registerDefaultTools(){
    this.registerDefaultTool('drawing', new Pencile(this.viewport));
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
