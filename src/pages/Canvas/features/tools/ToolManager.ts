import {Curve} from "./Curve";
import {Erase} from "./Erase";
import {ToolType} from "../../data/types/ToolTypes";
import useToolStore from "../../data/store/ToolStore";
import {ShapeTool} from "./ShapeTool";

export type ITool = {
    type: ToolType;
    startDrawing(): void;
    draw(): void;
    endDrawing(): void;
    initTool?(): void;
    disposeTool?(): void;
};

export class ToolManager {
    public tools: Record<ToolType, ITool> = {
        'pen': new Curve("pen"),
        'marker': new Curve("marker"),
        'eraser': new Erase(),
        'shape': new ShapeTool(),
        base: new Curve("pen"),
        "pan-zoom": new Curve("pen"),
        "selection-lasso": new Curve("pen"),
        "selection-square": new Curve("pen"),
        "screen-shot": new Curve("pen"),
        text: new Curve("pen"),
    }
    public currentTool: ITool | null = null;

    constructor() {
        this.setTool(useToolStore.getState().activeTool);
    }

    public setTool(toolType: ToolType) {
        if (this.currentTool?.type === toolType) return;
        if (this.currentTool && this.currentTool.disposeTool) {
            this.currentTool.disposeTool();
        }
        this.currentTool = this.tools[toolType] ?? null;
        if (this.currentTool?.initTool) {
            this.currentTool.initTool();
        }

        return this.currentTool;
    }
}
