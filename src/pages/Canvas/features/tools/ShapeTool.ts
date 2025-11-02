import { Graphics } from "pixi.js";
import { ToolType } from "../../data/types/ToolTypes";
import { InputState } from "../input/InputState";
import { ITool } from "./ToolManager";
import { useShapesStore } from "../../data/store/ShapeStore";
import { Continuum_Canvas } from "../CanvasApp";
import { SimplePoint } from "../../data/types/PointTypes";

export class ShapeTool implements ITool {
  type: ToolType = "shape";
  shapeGraphics: Graphics | null = null;
  // create graphic depending on state,
  startPoint: SimplePoint = { x: 0, y: 0 };

  startDrawing(e: InputState): void {
    this.shapeGraphics = new Graphics();
    this.startPoint = { ...e.mousePosition };
    Continuum_Canvas.viewportManager.viewport?.addChild(this.shapeGraphics);
  }
  // update graphic
  draw(e: InputState): void {
    if (!this.shapeGraphics) return;

    const currentPoint = { ...e.mousePosition };

    this.shapeGraphics.clear();
    const curentShape = useShapesStore.getState().shape;
    switch (curentShape) {
      case "square":
        this.drawRect(this.startPoint, currentPoint);
        break;
      case "circle":
        this.drawCircle(this.startPoint, currentPoint);
        break;
      case "poligon":
        this.drawPoligon(this.startPoint, currentPoint);
        break;
    }
  }
  // save graphic to
  endDrawing(e: InputState): void {
    this.shapeGraphics = null;
  }

  // craete some sort of cursor
  updateCursor(): void {}

  private drawRect(p1: SimplePoint, p2: SimplePoint) {
    if (!this.shapeGraphics) return;
    const width = Math.abs(p1.x - p2.x);
    const height = Math.abs(p1.y - p2.y);
    const start = { x: Math.min(p1.x, p2.x), y: Math.min(p1.y, p2.y) };
    const colorId = useShapesStore.getState().fillColorId;
    const fillColor = Continuum_Canvas.colorPalet.getColor(colorId);

    this.shapeGraphics
      .roundRect(start.x, start.y, width, height, 50)
      .fill(fillColor);
  }

  private drawCircle(p1: SimplePoint, p2: SimplePoint) {
    if (!this.shapeGraphics) return;

    const width = Math.abs(p1.x - p2.x);
    const height = Math.abs(p1.y - p2.y);

    const centerX = (p1.x + p2.x) / 2;
    const centerY = (p1.y + p2.y) / 2;

    const radiusX = width / 2;
    const radiusY = height / 2;

    const colorId = useShapesStore.getState().fillColorId;
    const color = Continuum_Canvas.colorPalet.getColor(colorId);

    this.shapeGraphics.ellipse(centerX, centerY, radiusX, radiusY).fill(color);
  }

  private drawPoligon(p1: SimplePoint, p2: SimplePoint) {
    if (!this.shapeGraphics) return;

    const width = Math.abs(p1.x - p2.x);
    const height = Math.abs(p1.y - p2.y);
    const radius = Math.min(width, height) / 2;

    const centerX = (p1.x + p2.x) / 2;
    const centerY = (p1.y + p2.y) / 2;

    const colorId = useShapesStore.getState().fillColorId;
    const fillColor = Continuum_Canvas.colorPalet.getColor(colorId);

    this.shapeGraphics.roundPoly(centerX, centerY, radius, 6, 0).fill(fillColor);
  }
}
