import { Curve } from "./Curve/Curve";
import { Erase } from "./Erase";
import { ToolType } from "../../data/types/ToolTypes";
import useToolStore from "../../data/store/ToolStore";
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

export class ToolManager {
  public tools: Map<ToolType, ITool> = new Map();
  public currentTool: ITool | null = null;

  constructor() {
    this.registerDefaultTools();
    this.setTool(useToolStore.getState().activeTool);
  }

  public registerDefaultTools() {
    this.tools.set("pen", new Curve("pen"));
    this.tools.set("highlighter", new Curve("marker"));
    this.tools.set("eraser", new Erase());
  }

  public setTool(toolType: ToolType) {
    if (!this.tools.has(toolType)) {
      return;
    }
    if (this.currentTool?.type === toolType) return;
    if (this.currentTool && this.currentTool.disposeTool) {
      this.currentTool.disposeTool();
    }
    this.currentTool = this.tools.get(toolType) ?? null;
    if (this.currentTool?.initTool) {
      this.currentTool.initTool();
    }

    return this.currentTool;
  }
}
