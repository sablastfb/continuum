import { Viewport } from "pixi-viewport";
import { ITool } from "../ITool";
import { FederatedMouseEvent, Graphics } from "pixi.js";
import { Point } from "../../../data/CanvasTypes";
import { MinimumDistanceToNextLine } from "../../../data/CanvasConstants";
import { Distance } from "../../utils/CanvasUtils";
import { CanvasStore, CanvasStore as Store } from "./../../../data/CanvasStore"
import { StoreApi, UseBoundStore } from "zustand";
import { graphicsData } from "../../service/data";
import { v4 as uuidv4 } from 'uuid';

export class Pencile implements ITool{
    private graphic: Graphics | null = null;
    private lastPoint: Point = { x: 0, y: 0 };
    private count = 0;

    constructor(private viewport : Viewport, private state:  UseBoundStore<StoreApi<CanvasStore>>,) {}

    public startDrawing(e: FederatedMouseEvent) {
    const worldPos = this.viewport.toWorld(e.global);
    this.graphic = new Graphics();

    const guid: string = uuidv4();
    graphicsData.push({id: guid, graph: this.graphic});

    this.graphic.moveTo(worldPos.x, worldPos.y);
    this.graphic.stroke({ width: 10, color: "white", cap: "round", join: "round" });
    this.viewport.addChild(this.graphic);
    this.lastPoint = { x: worldPos.x, y: worldPos.y };
    this.count = 0;
  }

  public draw(e: FederatedMouseEvent) {
    if(this.graphic === null) return;
    const worldPos = this.viewport.toWorld(e.global) as Point;
    if (Distance(worldPos, this.lastPoint) < MinimumDistanceToNextLine) {
      return;
    }

    this.graphic.lineTo(worldPos.x, worldPos.y);
    this.graphic.stroke({
      width: this.state.getState().pencileThickens,
      color: "white",
      cap: "round",
      join: "round",
    });
    const color = this.state.getState().color;
    this.graphic.tint = color;
    this.count++;
    this.lastPoint = { x: worldPos.x, y: worldPos.y };
  }
  public stopDrawing(e: FederatedMouseEvent) {
    console.log(this.count);
  }

  public updateCursor(cursor: Graphics, e: FederatedMouseEvent){
    const point = e.global;
    cursor.clear();
    cursor.circle(0,0,this.state.getState().pencileThickens).fill(this.state.getState().color).stroke({   alignment: 0, width: 1, color: 'black' })
    .moveTo(20,0).lineTo(this.state.getState().pencileThickens+5 ,0)
    .moveTo(-20,0).lineTo(-this.state.getState().pencileThickens-5 ,0)
    .moveTo(0,20).lineTo(0, this.state.getState().pencileThickens+5 )
    .moveTo(0,-20).lineTo(0, -this.state.getState().pencileThickens-5)
    .stroke({width: 3, color: "gray"});
    
    cursor.stroke({ width: 2, color: 0xfeeb77 });
    cursor.stroke({ width: 2, color: 0xffffff });

    cursor.x = point.x;
    cursor.y = point.y;
  }
}