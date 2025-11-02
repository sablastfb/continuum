import { ToolType } from "../../data/types/ToolTypes";
import { InputState } from "../input/InputState";
import { ITool } from "./ToolManager";

export class ShapeTool implements ITool {
  type: ToolType = "shape";

  // create graphic depending on state, 
  startDrawing(e: InputState): void {
    debugger;
  }
  // update graphic 
  draw(simpe: InputState): void {

  }
  // save graphic to 
  endDrawing(e: InputState): void {

  }

  // craete some sort of cursor 
  updateCursor(): void {
  }
}
