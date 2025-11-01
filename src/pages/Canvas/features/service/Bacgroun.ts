import { Filter, Graphics } from "pixi.js";
import { BacgroundStore } from "../../data/store/BacgroundStore";
import { Continuum_Canvas } from "../CanvasApp";

// hold bacground container
export class BacgroundService {
  public backgroundGraphics?: Graphics;
  private backgroundShader?: Filter;

  public init() {
    this.backgroundGraphics = new Graphics()
      .rect(0, 0, window.innerWidth, window.innerHeight)
      .fill("white");
    Continuum_Canvas.appInstance?.stage?.addChild(this.backgroundGraphics);
    this.backgroundShader = Continuum_Canvas.shaderService.getGridShader();
    this.backgroundGraphics.filters = [this.backgroundShader];
  }

  public updateBackgroundUniforms() {
    if (this.backgroundShader && Continuum_Canvas.viewportManager.viewport) {
      const uniforms = this.backgroundShader.resources.uniforms.uniforms;
      uniforms.viewportPosition = [
        Continuum_Canvas.viewportManager.viewport.corner.x,
        Continuum_Canvas.viewportManager.viewport.corner.y,
      ];
      uniforms.viewportZoom = Continuum_Canvas.viewportManager.viewport.scale.x;
    }
  }

  public updateBacground(bacgroundSettings: BacgroundStore) {}
}
