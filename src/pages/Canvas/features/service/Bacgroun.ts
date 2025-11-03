import { Graphics } from "pixi.js";
import useBacgroundStore, {
  BacgroundStore,
} from "../../data/store/BacgroundStore";
import { Continuum_Canvas } from "../CanvasApp";
import { ContinumShader } from "./ShaderService";

// hold bacground container
export class BacgroundService {
  private backgroundGraphics?: Graphics;
  private backgroundShader?: ContinumShader;

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
      bacgroundSettings.fillColorId
    );
    if (this.backgroundGraphics) {
      this.backgroundGraphics.tint = color;
    }
    const activeType = bacgroundSettings.activeBacgroundType;
    switch (activeType) {
      case "color": {
        this.backgroundGraphics.filters = [];
        break;
      }
      case "dots": {
        this.backgroundShader = Continuum_Canvas.shaderService.getNewShader(
          "dot",
          "bacground"
        );
        Continuum_Canvas.shaderService.updateShaderColor(
          this.backgroundShader.filter,
          color
        );
        this.backgroundGraphics.filters = [this.backgroundShader.filter];
        break;
      }
      case "grid": {
        this.backgroundShader = Continuum_Canvas.shaderService.getNewShader(
          "grid",
          "bacground"
        );
        Continuum_Canvas.shaderService.updateShaderColor(
          this.backgroundShader.filter,
          color
        );
        this.backgroundGraphics.filters = [this.backgroundShader.filter];
        break;
      }
    }
  }

  resize() {
    Continuum_Canvas.bacgroundService?.backgroundGraphics?.setSize(
      window.innerWidth,
      window.innerHeight
    );
    const filter = Continuum_Canvas.bacgroundService?.backgroundShader?.filter;
    if (filter) {
      const uniforms = filter.resources.uniforms.uniforms;
      uniforms.iResolution = [window.innerWidth, window.innerHeight];
    }

    Continuum_Canvas.shaderService?.updateUniforms();
  }

  public getShader(){
    return this.backgroundShader;
  }
}
