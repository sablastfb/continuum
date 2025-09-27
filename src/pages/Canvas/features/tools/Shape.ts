/**
 * Tool fro creating shape like circles and squars
 * It also fill them wiht textuer
 */

import { Graphics, Texture, TextureSource, TilingSprite } from "pixi.js";
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
import { Continuum_TailBacground } from "../service/TailBackground";

export class Shape implements ITool {
  type: Continuum_ToolManager.ToolType = "base";
  firstPosition!: SimplePoint;
  lastPosition!: SimplePoint;
  shape!: Graphics;
  outlineShape!: Graphics;
  tilingSprite!: TilingSprite;
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
    this.outlineShape = new Graphics();

    let shapeData: ShapeData = useShapesStore.getState().shapes[this.shapeType];
    if (shapeData.activeBacgroundType !== "color") {
      this.tilingSprite = new TilingSprite();
    }

    Continuum_CanvasViewport.viewport.addChild(this.shape);
    Continuum_CanvasViewport.viewport.addChild(this.tilingSprite);
    Continuum_CanvasViewport.viewport.addChild(this.outlineShape);
  }

  public draw<P extends MouseInputPoint>(e: P) {
    if (Continuum_Canvas.drawing === false) return;
    if (!Continuum_MouseService.isDragging(e, MouseButton.Left)) return;
    if (!Continuum_CanvasViewport.viewport) return;
    this.shape.clear();
    this.outlineShape.clear();
    
    this.lastPosition = Continuum_CanvasViewport.viewport.toWorld(e);
    let shapeData: ShapeData = useShapesStore.getState().shapes[this.shapeType];

    if (shapeData.activeBacgroundType !== "color") {
      this.setTailSpritePosition(this.firstPosition, this.lastPosition);
    }

    switch (this.shapeType) {
      case "circle":
        this.circle(this.shape, this.firstPosition, this.lastPosition);
        this.circle(this.outlineShape, this.firstPosition, this.lastPosition);
        break;
      case "square":
        this.square(this.outlineShape, this.firstPosition, this.lastPosition);
        this.square(this.shape, this.firstPosition, this.lastPosition);
        break;
      case "hexagon":
        this.poligon(this.outlineShape, this.firstPosition, this.lastPosition, 6);
        this.poligon(this.shape, this.firstPosition, this.lastPosition, 6);
        break;
    }

    const fillTyle = shapeData.fillType;
    if (fillTyle === "outline-only" || fillTyle === "outline-fill") {
      this.outline(this.shape, shapeData);
      this.outline(this.outlineShape, shapeData);
    }
    if (fillTyle === "fill-only" || fillTyle === "outline-fill") {
      this.fillPolygon(shapeData);
    }
  }

  private setTailSpritePosition(p1: SimplePoint, p2: SimplePoint) {
    this.tilingSprite.x = Math.min(p1.x, p2.x);
    this.tilingSprite.y = Math.min(p1.y, p2.y);
    this.tilingSprite.width = Math.abs(p1.x - p2.x);
    this.tilingSprite.height = Math.abs(p1.y - p2.y);
  }

  
  private outline(graphic: Graphics,shapeData: ShapeData) {
    graphic.stroke({
      color: Continuum_CanvasPalet.getColor(shapeData.outlineColor),
      width: shapeData.outlineWidth,
    });
  }

  private setTextureBacground(
    texture: Texture<TextureSource<any>> | undefined
  ) {
    if (!texture) return;
    this.shape.fill("white");
    this.tilingSprite.texture = texture;
    this.tilingSprite.mask = this.shape;
  }

  private fillPolygon(shapeData: ShapeData) {
    
    switch (shapeData.activeBacgroundType) {
      case "color":
        this.shape.fill(Continuum_CanvasPalet.getColor(shapeData.color));
        return;
      case "dots":
        this.setTextureBacground(
          Continuum_TailBacground.DotBacground(shapeData.dots)
        );
        break;
      case "grid":
        this.setTextureBacground(
          Continuum_TailBacground.GrindTile(shapeData.grid)
        );
        break;
      case "line":
        this.setTextureBacground(
          Continuum_TailBacground.HorizonalLineBacground(shapeData.line)
        );
    }
  }

  // TODO update to rounder poligon
  private poligon(graphic: Graphics, p1: SimplePoint, p2: SimplePoint, n: number) {
    const points = [];
    const w = Math.abs(p1.x - p2.x) / 2;
    const h = Math.abs(p1.y - p2.y) / 2;
    for (let i = 0; i < n; i += 1) {
      const x = w * Math.cos((2 * Math.PI * i) / n);
      const y = h * Math.sin((2 * Math.PI * i) / n);
      points.push(x, y);
    }
    graphic.poly(points);
    const ww = (-p1.x + p2.x) / 2;
    const hh = (-p1.y + p2.y) / 2;
    graphic.x = p1.x + ww;
    graphic.y = p1.y + hh;
  }

  private square(graphic: Graphics, p1: SimplePoint, p2: SimplePoint) {
    graphic.roundRect(
      Math.min(p1.x, p2.x),
      Math.min(p1.y, p2.y),
      Math.abs(p1.x - p2.x),
      Math.abs(p1.y - p2.y),
      10
    );
  }

  private circle(graphic: Graphics,p1: SimplePoint, p2: SimplePoint) {
    const w = Math.abs(p1.x - p2.x) / 2;
    const h = Math.abs(p1.y - p2.y) / 2;
    const center = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
    graphic.ellipse(center.x, center.y, w, h);
  }

  public stopDrawing<P extends MouseInputPoint>(e: P) {
    if (!Continuum_MouseService.isButtonReleased(e, MouseButton.Left)) {
      return;
    }
  }

  updateCursor(): void {
    CircleCursor.draw();
  }
}
