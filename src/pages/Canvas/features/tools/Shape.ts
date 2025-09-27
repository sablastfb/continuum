/**
 * Tool fro creating shape like circles and squars
 * It also fill them wiht textuer
 */

import { Graphics } from "pixi.js";
import { MouseInputPoint, SimplePoint } from "../../Types";
import { Continuum_Canvas } from "../CanvasApp";
import { Continuum_MouseService, MouseButton } from "../service/MouseService";
import { Continuum_CanvasViewport } from "../service/Viewport";
import { Continuum_ToolManager, ITool } from "./ToolManager";
import { CircleCursor } from "../cursor/Circle";
import {
  ShapeData,
  ShapeTypes,
  useShapesStore,
} from "../../data/store/ShapeStore";
import { Continuum_CanvasPalet } from "../../data/palet/PaletContainer";

export class Shape implements ITool {
  type: Continuum_ToolManager.ToolType = "base";
  firstPosition!: SimplePoint;
  lastPosition!: SimplePoint;
  shape!: Graphics;
  constructor(private shapeType: ShapeTypes) {
    this.type = this.shapeType;
  }

  public startDrawing<P extends MouseInputPoint>(e: P) {
    if (!Continuum_MouseService.isButtonPressed(e, MouseButton.Left)) {
      return;
    }
    if (!Continuum_CanvasViewport.viewport) return;

    this.firstPosition = Continuum_CanvasViewport.viewport.toWorld(e);
    this.shape = new Graphics();
    Continuum_CanvasViewport.viewport.addChild(this.shape);
  }

  public draw<P extends MouseInputPoint>(e: P) {
    if (Continuum_Canvas.drawing === false) return;
    if (!Continuum_MouseService.isDragging(e, MouseButton.Left)) return;
    if (!Continuum_CanvasViewport.viewport) return;
    this.shape.clear();
    this.lastPosition = Continuum_CanvasViewport.viewport.toWorld(e);
    let shapeData: ShapeData = useShapesStore.getState().shapes[this.shapeType];

    switch (this.shapeType) {
      case "circle":
        this.circle(this.firstPosition, this.lastPosition);
        break;
      case "square":
        this.square(this.firstPosition, this.lastPosition);
        break;
      case "hexagon":
        this.poligon(this.firstPosition, this.lastPosition, 6);
        break;
    }

    const fillTyle = shapeData.fillType;
    if (fillTyle === "fill-only" || fillTyle === "outline-fill") {
      this.fillPolygon(shapeData);
    }
    if (fillTyle === "outline-only" || fillTyle === "outline-fill") {
      this.outlineOnly(shapeData);
    }
  }

  private outlineOnly(shapeData: ShapeData) {
     this.shape.stroke({
      color: Continuum_CanvasPalet.getColor(shapeData.outlineColor),
      width: shapeData.outlineWidth, 
     });
  }

  private fillPolygon(shapeData: ShapeData) {
    switch (shapeData.activeBacgroundType) {
      case "color":
        this.shape.fill(Continuum_CanvasPalet.getColor(shapeData.color));
    }
  }

  // TODO update to rounder poligon
  private poligon(p1: SimplePoint, p2: SimplePoint, n: number) {
    const points = [];
    const w = Math.abs(p1.x - p2.x) / 2;
    const h = Math.abs(p1.y - p2.y) / 2;
    for (let i = 0; i < n; i += 1) {
      const x = w * Math.cos((2 * Math.PI * i) / n);
      const y = h * Math.sin((2 * Math.PI * i) / n);
      points.push(x, y);
    }
    this.shape.poly(points);
    const ww = (-p1.x + p2.x) / 2;
    const hh = (-p1.y + p2.y) / 2;
    this.shape.x = p1.x + ww;
    this.shape.y = p1.y + hh;
  }

  private square(p1: SimplePoint, p2: SimplePoint) {
    this.shape.roundRect(
      Math.min(p1.x, p2.x),
      Math.min(p1.y, p2.y),
      Math.abs(p1.x - p2.x),
      Math.abs(p1.y - p2.y),
      50
    );
  }

  private circle(p1: SimplePoint, p2: SimplePoint) {
    const w = Math.abs(p1.x - p2.x) / 2;
    const h = Math.abs(p1.y - p2.y) / 2;
    const center = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
    this.shape.ellipse(center.x, center.y, w, h);
  }

  public stopDrawing<P extends MouseInputPoint>(e: P) {
    if (
      !Continuum_MouseService.isButtonReleased(e, MouseButton.Left)
    ) {
      return;
    }
  }

  updateCursor(): void {
    CircleCursor.draw();
  }
}
