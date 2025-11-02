import { Graphics } from "pixi.js";
import { ToolType } from "../../../data/types/ToolTypes";
import { InputState } from "../../../features/input/InputState";
import { ITool } from "../../../features/tools/ToolManager";
import { useShapesStore } from "../../../data/store/ShapeStore";
import { Continuum_Canvas } from "../../../features/CanvasApp";
import { SimplePoint } from "../../../data/types/PointTypes";

export class ShapeTool implements ITool {
  type: ToolType = "shape";
  shapeGraphics: Graphics | null = null;
  strokeGraphics: Graphics | null = null;
  // create graphic depending on state,
  startPoint: SimplePoint = { x: 0, y: 0 };

  startDrawing(e: InputState): void {
    this.shapeGraphics = new Graphics();
    this.strokeGraphics = new Graphics();
    this.startPoint = { ...e.mousePosition };
    Continuum_Canvas.viewportManager.viewport?.addChild(this.shapeGraphics);
    Continuum_Canvas.viewportManager.viewport?.addChild(this.strokeGraphics);
  }
  // update graphic
  draw(e: InputState): void {
    if (!this.shapeGraphics) return;
    if (!this.strokeGraphics) return;

    const currentPoint = { ...e.mousePosition };

    this.shapeGraphics.clear();
    this.strokeGraphics.clear();

    const curentShape = useShapesStore.getState().shape;
    const fillType = useShapesStore.getState().fillType;
    const fill = fillType === "fill-only" || fillType === "outline-fill";
    const stroke = fillType === "outline-only" || fillType === "outline-fill";

    switch (curentShape) {
      case "square":
        this.drawRect(this.startPoint, currentPoint, fill, stroke);
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

  private drawRect(
    p1: SimplePoint,
    p2: SimplePoint,
    fill: boolean,
    stroke: boolean
  ) {
    if (!this.shapeGraphics) return;
    if (!this.strokeGraphics) return;
    const width = Math.abs(p1.x - p2.x);
    const height = Math.abs(p1.y - p2.y);
    const start = { x: Math.min(p1.x, p2.x), y: Math.min(p1.y, p2.y) };
    const colorId = useShapesStore.getState().fillColorId;
    const strokeColorId = useShapesStore.getState().strokeColorId;
    const fillColor = Continuum_Canvas.colorPalet.getColor(colorId);
    const strokeColor = Continuum_Canvas.colorPalet.getColor(strokeColorId);

    if (fill) {
      this.shapeGraphics
        .roundRect(start.x, start.y, width, height, 50)
        .fill("white");
      this.shapeGraphics.tint = fillColor;
    }
    if (stroke) {
      this.strokeGraphics
        .roundRect(start.x, start.y, width, height, 50)
        .stroke({width:5, color: 'white'});
        this.strokeGraphics.tint = strokeColor;
    }
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

    this.shapeGraphics
      .roundPoly(centerX, centerY, radius, 6, 0)
      .fill(fillColor);
  }
}
