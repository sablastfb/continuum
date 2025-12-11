import { Curve } from "./Curve";
import { Erase } from "./Erase";
import { ToolType } from "../../data/types/ToolTypes";
import useToolStore from "../../data/store/ToolStore";
import { InputState } from "../input/InputState";
import { ShapeTool } from "./ShapeTool";

export type ITool ={
  type: ToolType;
  startDrawing(e: InputState): void;
  draw(e: InputState): void;
  endDrawing(e: InputState): void;
  updateCursor(): void;
  initTool?(): void;
  disposeTool?(): void;
};

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
    this.tools.set("shape", new ShapeTool());
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
