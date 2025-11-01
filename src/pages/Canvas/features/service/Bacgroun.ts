import { Graphics } from "pixi.js";
import { BacgroundStore } from "../../data/store/BacgroundStore";
import { Continuum_Canvas } from "../CanvasApp";

// hold bacground container
export class BacgroundService {
  public backgroundGraphics?: Graphics;

  public init() {
    debugger;
    this.backgroundGraphics = new Graphics().rect(0, 0, 5000, 5000).fill("red");
    Continuum_Canvas.appInstance?.stage?.addChild(this.backgroundGraphics);
    const shader = Continuum_Canvas.shaderService.getGridShader();
    this.backgroundGraphics.filters = [shader];
  }

  public updateBacground(bacgroundSettings: BacgroundStore) {}
}
