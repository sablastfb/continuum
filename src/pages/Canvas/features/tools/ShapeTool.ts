import { Filter, Graphics, Mesh, MeshGeometry, Shader } from "pixi.js";
import { ToolType } from "../../data/types/ToolTypes";
import { InputState } from "../input/InputState";
import { ITool } from "./ToolManager";
import { Continuum_Canvas } from "../CanvasApp";
import { SimplePoint } from "../../data/types/PointTypes";
import { useShapesStore } from "../../data/store/ShapeStore";
import { CrossHairCursor } from "../cursor/CrossHair";

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
    // const shader = Continuum_Canvas.shapeShaderService.createShapeShader();
    // if (shader) {
    //   this.curenetfilter = shader?.filter;
    //   Continuum_Canvas.shapeShaderService.updateShaderColor(
    //     shader.filter,
    //     fillColor
    //   );
    // }
  }

  draw(e: InputState): void {
    if (!this.shapeGraphics) return;
    if (!this.strokeGraphics) return;

    const currentPoint = { ...e.mousePosition };
    this.shapeGraphics.tint = "0xFFFFFF";

    // this.shapeGraphics.clear();
    // this.strokeGraphics.clear();

    const curentShape = useShapesStore.getState().shape;
    const fillType = useShapesStore.getState().fillType;
    const drawFill = fillType === "fill-only" || fillType === "outline-fill";
    const drawStroke =
      fillType === "outline-only" || fillType === "outline-fill";

    switch (curentShape) {
      case "square":
        this.drawRect(this.startPoint, currentPoint, drawFill, drawStroke);
        break;
      case "circle":
        break;
      case "poligon":
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
    const strokeColor = Continuum_Canvas.colorPalet.getColor(strokeColorId);
    const stroke = useShapesStore.getState().stroke;
    const radius = useShapesStore.getState().cornerRadius;

    if (drawFill) {
      const newGeometry = Continuum_Canvas.meshCreator.getRectangleGeometry(
        0,
        0,
        width,
        height,
        radius
      );
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
        .roundRect(start.x, start.y, width, height, radius)
        .stroke({ width: stroke, color: "white" });
      this.strokeGraphics.tint = strokeColor;
    }
  }

  private drawPoligon(
    p1: SimplePoint,
    p2: SimplePoint,
    drawFill: boolean,
    drawStroke: boolean
  ) {
    // if (!this.shapeGraphics) return;
    // if (!this.strokeGraphics) return;
    // const width = Math.abs(p1.x - p2.x);
    // const height = Math.abs(p1.y - p2.y);
    // const radius = Math.min(width, height) / 2;
    // const centerX = (p1.x + p2.x) / 2;
    // const centerY = (p1.y + p2.y) / 2;
    // const numberOfCorners = useShapesStore.getState().numberOfCorners;
    // const cornerRadius = useShapesStore.getState().cornerRadius;
    // const stroke = useShapesStore.getState().stroke;
    // const colorId = useShapesStore.getState().fillColorId;
    // const strokeColorId = useShapesStore.getState().strokeColorId;
    // const fillColor = Continuum_Canvas.colorPalet.getColor(colorId);
    // const strokeColor = Continuum_Canvas.colorPalet.getColor(strokeColorId);
    // if (drawFill) {
    //   this.shapeGraphics
    //     .roundPoly(centerX, centerY, radius, numberOfCorners, cornerRadius)
    //     .fill("white");
    //   this.shapeGraphics.tint = fillColor;
    // }
    // if (drawStroke) {
    //   this.strokeGraphics
    //     .roundPoly(centerX, centerY, radius, numberOfCorners, cornerRadius)
    //     .stroke({ width: stroke, color: "white" });
    //   this.strokeGraphics.tint = strokeColor;
    // }
    // if (this.curenetfilter)
    //   Continuum_Canvas.shapeShaderService.updateShapeSize(this.curenetfilter, {
    //     x: this.shapeGraphics.width,
    //     y: this.shapeGraphics.height,
    //   });
  }

  // craete some sort of cursor
  updateCursor(): void {
    CrossHairCursor.draw();
  }
}
