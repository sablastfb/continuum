import { Curve } from "./Curve";
import { Erase } from "./Erase";
import { ToolType } from "../../data/types/ToolTypes";
import useToolStore from "../../data/store/ToolStore";
import { InputState } from "../input/InputState";
import { ShapeTool } from "./ShapeTool";
import {Cursor} from "../cursors/Cursor.ts";

export type ITool ={
  type: ToolType;
  startDrawing(e: InputState): void;
  draw(e: InputState): void;
  endDrawing(e: InputState): void;
  updateCursor(): void;
  initTool?(): void;
  disposeTool?(): void;
};

export type ICursor = {
  updateCursor(e: InputState): void;
}
export type ToolBinding = {
  Tool: ITool;
  Cursor: ICursor;
}

export class ToolManager {
  public tools: Map<ToolType, ToolBinding> = new Map();
  public currentTool: ITool | null = null;
  public currentCursor: ICursor | null = null;

  constructor() {
    this.registerDefaultTools();
    this.setTool(useToolStore.getState().activeTool);
  }

  public registerDefaultTools() {
    this.tools.set("pen", {Tool:new Curve("pen"), Cursor: new Cursor()});
    this.tools.set("marker", {Tool: new Curve("marker"), Cursor: new Cursor()});
    this.tools.set("eraser", {Tool: new Erase(), Cursor: new Cursor()});
    this.tools.set("shape",  {Tool: new ShapeTool(), Cursor: new Cursor()});
  }

  public setTool(toolType: ToolType) {
    if (!this.tools.has(toolType)) {
      return;
    }
    if (this.currentTool?.type === toolType) return;
    if (this.currentTool && this.currentTool.disposeTool) {
      this.currentTool.disposeTool();
    }
    this.currentTool = this.tools.get(toolType)?.Tool ?? null;
    this.currentCursor = this.tools.get(toolType)?.Cursor ?? null;
    if (this.currentTool?.initTool) {
      this.currentTool.initTool();
    }

    return this.currentTool;
  }
}
