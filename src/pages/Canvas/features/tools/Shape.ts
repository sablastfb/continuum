import { ToolType } from "../../data/types/ToolTypes";
import { InputState } from "../input/InputState";
import { ITool } from "./ToolManager";

export class Shape implements ITool {
    type?: ToolType | undefined = "shape";
    startDrawing(e: InputState): void {
        
    }
    draw(simpe: InputState): void {
        
    }
    endDrawing(e: InputState): void {
        
    }
}
