import { Graphics } from "pixi.js";
import useBacgroundStore, {
  BacgroundStore,
} from "../../data/store/BacgroundStore";
import { Continuum_Canvas } from "../CanvasApp";

export class BacgroundService {
  private backgroundGraphics?: Graphics;

  public init() {
    this.backgroundGraphics = new Graphics()
      .rect(0, 0, window.innerWidth, window.innerHeight)
      .fill("white");

    Continuum_Canvas.appInstance?.stage?.addChild(this.backgroundGraphics);
    this.updateBacground(useBacgroundStore.getState());
    this.backgroundGraphics.filters = [
      Continuum_Canvas.bacgroundShaderService.getBacgroundShader(),
    ];
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
    Continuum_Canvas.bacgroundShaderService.updateBacgroundType(activeType);
  }

  resize() {
    Continuum_Canvas.bacgroundService?.backgroundGraphics?.setSize(
      window.innerWidth,
      window.innerHeight
    );
    Continuum_Canvas.bacgroundShaderService?.updateBacgroundUniforms();
  }
}
