import { Graphics } from "pixi.js";
import { ToolType } from "../../data/types/ToolTypes";
import { InputState } from "../input/InputState";
import { ITool } from "./ToolManager";
import { useShapesStore } from "../../data/store/ShapeStore";
import { Continuum_Canvas } from "../CanvasApp";

export class ShapeTool implements ITool {
  type: ToolType = "shape";
  shapeGraphics?: Graphics;
  // create graphic depending on state,
  startDrawing(e: InputState): void {
    this.shapeGraphics = new Graphics();


    switch (useShapesStore.getState().shape) {
      case "square":
        this.shapeGraphics.rect(e.mousePosition.x,e.mousePosition.y,100,100).fill("red");
        break;
      case "circle":

        break;
      case "poligon":
        break;
    };
    Continuum_Canvas.viewportManager.viewport?.addChild(this.shapeGraphics);
  }
  // update graphic
  draw(e: InputState): void {

  }
  // save graphic to
  endDrawing(e: InputState): void {}

  // craete some sort of cursor
  updateCursor(): void {}
}
