import { Graphics } from "pixi.js";
import useBackgroundStore, {
  BackgroundStore,
} from "../../data/store/BackgroundStore.ts";
import { Continuum_Canvas } from "../CanvasApp";

export class BackgroundService {
  private backgroundGraphics?: Graphics;

  public init() {
    this.backgroundGraphics = new Graphics()
      .rect(0, 0, window.innerWidth, window.innerHeight)
      .fill("white");

    Continuum_Canvas.appInstance?.stage?.addChild(this.backgroundGraphics);
    this.backgroundGraphics.filters = [
      Continuum_Canvas.backgroundShaderService.getBackgroundShader(),
    ];
    this.updateBackground(useBackgroundStore.getState());
  }

  public updateBackground(backgroundSettings: BackgroundStore) {
    if (!this.backgroundGraphics) return;

    const color = Continuum_Canvas.colorPalette.getColor(
      backgroundSettings.fillColorId
    );
    if (this.backgroundGraphics) {
      Continuum_Canvas.backgroundShaderService.updateShaderColor(color);
      this.backgroundGraphics.tint = color;
    }
    const activeType = backgroundSettings.activeBackgroundType;
    Continuum_Canvas.backgroundShaderService.updateBackgroundType(activeType);
  }

  resize() {
    Continuum_Canvas.backgroundService?.backgroundGraphics?.setSize(
      window.innerWidth,
      window.innerHeight
    );
    Continuum_Canvas.backgroundShaderService?.updateBackgroundUniforms();
  }
}
