import { Graphics, Mesh, MeshGeometry, Shader } from "pixi.js";
import { ToolType } from "../../data/types/ToolTypes";
import { InputState } from "../input/InputState";
import { ITool } from "./ToolManager";
import { Continuum_Canvas } from "../CanvasApp";
import { SimplePoint } from "../../data/types/PointTypes";
import {
  shapePatternShaderIdMapper,
  useShapesStore,
} from "../../data/store/ShapeStore";
import { SimpleCross } from "../cursor/SimpleCross";

export class ShapeTool implements ITool {
  type: ToolType = "shape";
  shapeGraphics: Mesh<MeshGeometry, Shader> | null = null;
  strokeGraphics: Graphics | null = null;
  startPoint: SimplePoint = { x: 0, y: 0 };

  startDrawing(e: InputState): void {
    this.shapeGraphics = Continuum_Canvas.meshCreator.createMesh(
      Continuum_Canvas.shapeShaderService.createShader()
    );
    this.strokeGraphics = new Graphics();
    this.startPoint = { ...e.mousePosition };
    Continuum_Canvas.viewportManager.viewport?.addChild(this.shapeGraphics);
    Continuum_Canvas.viewportManager.viewport?.addChild(this.strokeGraphics);
    const colorId = useShapesStore.getState().fillColorId;
    const fillColor = Continuum_Canvas.colorPalet.getColor(colorId);

    Continuum_Canvas.shapeShaderService.updateShaderColor(
      this.shapeGraphics.shader,
      fillColor
    );
    Continuum_Canvas.shapeShaderService.updateShaderPatter(
      this.shapeGraphics.shader,
      shapePatternShaderIdMapper[useShapesStore.getState().activeBacgroundType]
    );
  }

  draw(e: InputState): void {
    if (!this.shapeGraphics) return;
    if (!this.strokeGraphics) return;

    const currentPoint = { ...e.mousePosition };
    // this.shapeGraphics.clear();
    // this.strokeGraphics.clear();

    const curentShape = useShapesStore.getState().shape;
    const fillType = useShapesStore.getState().fillType;
    const drawFill =
      fillType === "fill-only" || fillType === "outline-and-fill";
    const drawStroke =
      fillType === "outline-only" || fillType === "outline-and-fill";

    switch (curentShape) {
      case "square":
        this.drawRect(this.startPoint, currentPoint, drawFill, drawStroke);
        break;
      case "circle":
        this.drawCircle(this.startPoint, currentPoint, drawFill, drawStroke);
        break;
      case "poligon":
        this.drawPoligon(this.startPoint, currentPoint, drawFill, drawStroke);
        break;
    }
  }
  // save graphic to
  endDrawing(e: InputState): void {
    this.shapeGraphics = null;
  }

  private drawRect(
    p1: SimplePoint,
    p2: SimplePoint,
    drawFill: boolean,
    drawStroke: boolean
  ) {
    if (!this.shapeGraphics) return;
    if (!this.strokeGraphics) return;
    const width = Math.abs(p1.x - p2.x);
    const height = Math.abs(p1.y - p2.y);
    const start = { x: Math.min(p1.x, p2.x), y: Math.min(p1.y, p2.y) };
    const colorId = useShapesStore.getState().fillColorId;
    const strokeColorId = useShapesStore.getState().strokeColorId;
    const fillColor = Continuum_Canvas.colorPalet.getColor(colorId);
    const centerX = (p1.x + p2.x) / 2;
    const centerY = (p1.y + p2.y) / 2;
    Continuum_Canvas.shapeShaderService.updateShaderColor(
      this.shapeGraphics.shader,
      fillColor
    );
    const strokeColor = Continuum_Canvas.colorPalet.getColor(strokeColorId);
    const stroke = useShapesStore.getState().strokeSize;
    const radius = useShapesStore.getState().cornerRadius;
    const newGeometry = Continuum_Canvas.meshCreator.getRectangleGeometry(
      width,
      height,
      radius
    );

    if (drawFill) {
      Continuum_Canvas.meshCreator.setGeometry(this.shapeGraphics, newGeometry);
      Continuum_Canvas.shapeShaderService.updateShapeSize(
        this.shapeGraphics.shader,
        width,
        height
      );
      this.shapeGraphics.x = start.x;
      this.shapeGraphics.y = start.y;
    }

    if (drawStroke) {
     this.strokeGraphics.clear();
      this.strokeGraphics
        .poly([...newGeometry.positions])
        .stroke({ width: stroke, color: "white" });
           this.strokeGraphics.x = centerX-width/2;
      this.strokeGraphics.y = centerY-height/2;
      this.strokeGraphics.tint = strokeColor;
    }
  }

  private drawPoligon(
    p1: SimplePoint,
    p2: SimplePoint,
    drawFill: boolean,
    drawStroke: boolean
  ) {
    if (!this.shapeGraphics) return;
    if (!this.strokeGraphics) return;
    const width = Math.abs(p1.x - p2.x);
    const height = Math.abs(p1.y - p2.y);
    const radius = Math.min(width, height) / 2;
    const centerX = (p1.x + p2.x) / 2;
    const centerY = (p1.y + p2.y) / 2;
    const numberOfCorners = useShapesStore.getState().numberOfCorners;
    const stroke = useShapesStore.getState().strokeSize;
    const colorId = useShapesStore.getState().fillColorId;
    const strokeColorId = useShapesStore.getState().strokeColorId;
    const fillColor = Continuum_Canvas.colorPalet.getColor(colorId);
    const strokeColor = Continuum_Canvas.colorPalet.getColor(strokeColorId);
    const newGeometry = Continuum_Canvas.meshCreator.getPoligonGeometry(
      radius,
      numberOfCorners
    );
    if (drawFill) {
      Continuum_Canvas.meshCreator.setGeometry(this.shapeGraphics, newGeometry);
      Continuum_Canvas.shapeShaderService.updateShapeSize(
        this.shapeGraphics.shader,
        radius,
        radius
      );
      this.shapeGraphics.x = centerX;
      this.shapeGraphics.y = centerY;
    }

    if (drawStroke) {
      this.strokeGraphics.clear();
      this.strokeGraphics
        .poly([...newGeometry.positions])
        .stroke({ width: stroke, color: "white" });
      this.strokeGraphics.x = centerX;
      this.strokeGraphics.y = centerY;
      this.strokeGraphics.tint = strokeColor;
    }

    Continuum_Canvas.shapeShaderService.updateShapeSize(
      this.shapeGraphics.shader,
      radius,
      radius
    );
  }

  private drawCircle(
    p1: SimplePoint,
    p2: SimplePoint,
    drawFill: boolean,
    drawStroke: boolean
  ) {
    if (!this.shapeGraphics) return;
    if (!this.strokeGraphics) return;
    const width = Math.abs(p1.x - p2.x);
    const height = Math.abs(p1.y - p2.y);
    const radius = Math.min(width, height) / 2;
    const centerX = (p1.x + p2.x) / 2;
    const centerY = (p1.y + p2.y) / 2;
    const strokeSize = useShapesStore.getState().strokeSize;
    const colorId = useShapesStore.getState().fillColorId;
    const strokeColorId = useShapesStore.getState().strokeColorId;
    const fillColor = Continuum_Canvas.colorPalet.getColor(colorId);
    const strokeColor = Continuum_Canvas.colorPalet.getColor(strokeColorId);
    const newGeometry = Continuum_Canvas.meshCreator.getCircleGeometry(radius);
    if (drawFill) {
      Continuum_Canvas.meshCreator.setGeometry(this.shapeGraphics, newGeometry);
      Continuum_Canvas.shapeShaderService.updateShapeSize(
        this.shapeGraphics.shader,
        radius,
        radius
      );
      this.shapeGraphics.x = centerX;
      this.shapeGraphics.y = centerY;
    }

    if (drawStroke) {
      this.strokeGraphics.clear();
      this.strokeGraphics
        .poly([...newGeometry.positions])
        .stroke({ width: strokeSize, color: "white" });
      this.strokeGraphics.x = centerX;
      this.strokeGraphics.y = centerY;
      this.strokeGraphics.tint = strokeColor;
    }

    Continuum_Canvas.shapeShaderService.updateShapeSize(
      this.shapeGraphics.shader,
      radius,
      radius
    );
  }

  // craete some sort of cursor
  updateCursor(): void {
    SimpleCross.draw();
  }
}
