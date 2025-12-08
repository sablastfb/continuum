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
import { ContinuumMeshGeometry } from "../service/MeshCreator";

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
    Continuum_Canvas.viewportManager.viewport?.addChild(this.shapeGraphics);
    Continuum_Canvas.viewportManager.viewport?.addChild(this.strokeGraphics);

    this.startPoint = { ...e.mousePosition };

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

  endDrawing(): void {
    this.shapeGraphics = null;
  }

  private getPoints(p1: SimplePoint, p2: SimplePoint) {
    const width = Math.abs(p1.x - p2.x);
    const height = Math.abs(p1.y - p2.y);
    const start = { x: Math.min(p1.x, p2.x), y: Math.min(p1.y, p2.y) };
    const centerX = (p1.x + p2.x) / 2;
    const centerY = (p1.y + p2.y) / 2;
    const radius = Math.min(width, height) / 2;

    return { width, height, centerX, centerY, start, radius };
  }

  private drawRect(
    p1: SimplePoint,
    p2: SimplePoint,
    drawFill: boolean,
    drawStroke: boolean
  ) {
    if (!this.shapeGraphics) return;
    if (!this.strokeGraphics) return;

    const { width, height, centerX, centerY, start } = this.getPoints(p1, p2);
    const cornerRadius = useShapesStore.getState().cornerRadius;

    const newGeometry = Continuum_Canvas.meshCreator.getRectangleGeometry(
      width,
      height,
      cornerRadius
    );

    if (drawFill) {
      this.drawFill(newGeometry, start.x, start.y);
      Continuum_Canvas.shapeShaderService.updateShapeSize(
        this.shapeGraphics.shader,
        width,
        height
      );
    }

    if (drawStroke) {
      this.drawStroke(newGeometry, centerX - width / 2, centerY - height / 2);
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
    const { centerX, centerY, radius } = this.getPoints(p1, p2);
    const numberOfCorners = useShapesStore.getState().numberOfCorners;

    const newGeometry = Continuum_Canvas.meshCreator.getPoligonGeometry(
      radius,
      numberOfCorners
    );
    if (drawFill) {
      this.drawFill(newGeometry, centerX, centerY);
      Continuum_Canvas.shapeShaderService.updateShapeSize(
        this.shapeGraphics.shader,
        radius,
        radius
      );
    }

    if (drawStroke) {
      this.drawStroke(newGeometry, centerX, centerY);
    }
  }

  private drawCircle(
    p1: SimplePoint,
    p2: SimplePoint,
    drawFill: boolean,
    drawStroke: boolean
  ) {
    if (!this.shapeGraphics) return;
    if (!this.strokeGraphics) return;
    const { width, height, centerX, centerY } = this.getPoints(p1, p2);

    const newGeometry = Continuum_Canvas.meshCreator.getCircleGeometry(
      width / 2,
      height / 2
    );
    if (drawFill) {
      this.drawFill(newGeometry, centerX, centerY);
      Continuum_Canvas.shapeShaderService.updateShapeSize(
        this.shapeGraphics.shader,
        width / 2,
        height / 2
      );
    }

    if (drawStroke) {
      this.drawStroke(newGeometry, centerX, centerY);
    }
  }

  private drawFill(newGeometry: ContinuumMeshGeometry, x: number, y: number) {
    if (!this.shapeGraphics) return;
    Continuum_Canvas.meshCreator.setGeometry(this.shapeGraphics, newGeometry);
    this.shapeGraphics.x = x;
    this.shapeGraphics.y = y;
  }

  private drawStroke(newGeometry: ContinuumMeshGeometry, x: number, y: number) {
    if (!this.strokeGraphics) return;
    const strokeColorId = useShapesStore.getState().strokeColorId;
    const strokeSize = useShapesStore.getState().strokeSize;
    const strokeColor = Continuum_Canvas.colorPalet.getColor(strokeColorId);

    this.strokeGraphics.clear();
    this.strokeGraphics
      .poly([...newGeometry.positions])
      .stroke({ width: strokeSize, color: "white" });
    this.strokeGraphics.x = x;
    this.strokeGraphics.y = y;
    this.strokeGraphics.tint = strokeColor;
  }

  updateCursor(): void {
    SimpleCross.draw();
  }
}
