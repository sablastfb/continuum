import { Filter, Graphics } from "pixi.js";
import useBacgroundStore, {
  BacgroundStore,
} from "../../data/store/BacgroundStore";
import { Continuum_Canvas } from "../CanvasApp";

// hold bacground container
export class BacgroundService {
  private backgroundGraphics?: Graphics;
  public backgroundShader?: Filter;

  public init() {
    this.backgroundGraphics = new Graphics()
      .rect(0, 0, window.innerWidth, window.innerHeight)
      .fill("white");

    Continuum_Canvas.appInstance?.stage?.addChild(this.backgroundGraphics);
    this.updateBacground(useBacgroundStore.getState());
  }

  public updateBacground(bacgroundSettings: BacgroundStore) {
    if (!this.backgroundGraphics) return;
    const color = Continuum_Canvas.colorPalet.getColor(
      bacgroundSettings.background.color
    );
    if (this.backgroundGraphics) {
      this.backgroundGraphics.tint = color;
    }

    if (bacgroundSettings.background.activeBacgroundType === "dots") {
      this.backgroundShader = Continuum_Canvas.shaderService.getDotShader();
      Continuum_Canvas.shaderService.updateShaderColor(
        this.backgroundShader,
        color
      );
      this.backgroundGraphics.filters = [this.backgroundShader];
    }

    if (bacgroundSettings.background.activeBacgroundType === "grid") {
      this.backgroundShader = Continuum_Canvas.shaderService.getGridShader();
      Continuum_Canvas.shaderService.updateShaderColor(
        this.backgroundShader,
        color
      );
      this.backgroundGraphics.filters = [this.backgroundShader];
    }
    this.updateBackgroundUniforms();
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

  resize() {
    Continuum_Canvas.bacgroundService?.backgroundGraphics?.setSize(
      window.innerWidth,
      window.innerHeight
    );
    if (Continuum_Canvas.bacgroundService?.backgroundShader) {
      const uniforms =
        Continuum_Canvas.bacgroundService.backgroundShader.resources.uniforms
          .uniforms;
      uniforms.iResolution = [window.innerWidth, window.innerHeight];
    }

    Continuum_Canvas.bacgroundService?.updateBackgroundUniforms();
  }
}
