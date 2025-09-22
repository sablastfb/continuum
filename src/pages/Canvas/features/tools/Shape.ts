/**
 * Tool fro creating shape like circles and squars
 * It also fill them wiht textuer
 */

import { Graphics, TilingSprite } from "pixi.js";
import { MouseInputPoint, SimplePoint } from "../../Types";
import { Continuum_Canvas } from "../CanvasApp";
import { Continuum_MouseService, MouseButton } from "../service/MouseService";
import { Continuum_CanvasViewport } from "../service/Viewport";
import { Continuum_ToolManager, ITool } from "./ToolManager";
import { CircleCursor } from "../cursor/Circle";
import { TailBacground } from "../service/TailBackground";

/// FIX this so i can change type
export type ShapeType = "circle" | "square" | "hexagon" | "poligon";

export class Shape implements ITool {
  type: Continuum_ToolManager.ToolType = "circle";
  firstPosition!: SimplePoint;
  lastPosition!: SimplePoint;
  shape!: Graphics;
  constructor(private shapeType: ShapeType) {}

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
    const graph = TailBacground.GrindTile({
      bacgroundColor: "bg-1",
      gridBorderColor: "bgt-1",
      sizeOfGrid: 50,
      widthOfGridLine: 0.5,
    });

    
    const w = Math.abs(this.firstPosition.x - this.lastPosition.x);
    const h = Math.abs(this.firstPosition.y - this.lastPosition.y);
    const tilingSprite = new TilingSprite({
      width: w,
      height: h,
      texture: graph,
    });
    tilingSprite.x = this.firstPosition.x;
    tilingSprite.y = this.firstPosition.y;

    tilingSprite.mask = this.shape;
    Continuum_CanvasViewport.viewport.addChild(tilingSprite);

    this.shape.fill("red");
  }

  private poligon(p1: SimplePoint, p2: SimplePoint, n: number) {
    const points = [];
    const w = Math.abs(p1.x - p2.x);
    const h = Math.abs(p1.y - p2.y);
    for (let i = 0; i < n; i += 1) {
      const x = w * Math.cos((2 * Math.PI * i) / n);
      const y = h * Math.sin((2 * Math.PI * i) / n);
      points.push(x, y);
    }
    this.shape.poly(points);
    this.shape.x = p1.x;
    this.shape.y = p1.y;
  }

  private square(p1: SimplePoint, p2: SimplePoint) {
    this.shape.rect(
      Math.min(p1.x, p2.x),
      Math.min(p1.y, p2.y),
      Math.abs(p1.x - p2.x),
      Math.abs(p1.y - p2.y)
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
      !Continuum_MouseService.isButtonReleased(e, MouseButton.Left) &&
      Continuum_Canvas.drawing === true
    ) {
      return;
    }
  }

  updateCursor(): void {
    CircleCursor.draw();
  }
}
