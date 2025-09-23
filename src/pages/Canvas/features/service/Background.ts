import { Texture, TilingSprite } from "pixi.js";
import { Continuum_Canvas } from "../CanvasApp";
import { TailBacground, TileBacgroundSettings } from "./TailBackground";
import { Continuum_CanvasPalet, ColorId } from "../../data/palet/PaletContainer";

export namespace Continuum_CanvasBacground {
  export let backgroundTilingSprite: TilingSprite;

  export function init() {
    if (!Continuum_Canvas.appInstance) return;

    backgroundTilingSprite = new TilingSprite({
      width: Continuum_Canvas.appInstance.renderer.width,
      height: Continuum_Canvas.appInstance.renderer.height,
    });
    Continuum_Canvas.appInstance.stage.addChild(backgroundTilingSprite);
  }

  export function changeBackground(bs: TileBacgroundSettings) {
    let texture = null;
    let colorId = null;
    switch (bs.activeBacgroundType) {
      case "color":
        texture = null;
        colorId = bs.color;
        break;
      case "dots":
        texture = TailBacground.DotBacground(bs.dots);
        colorId = bs.dots.bacgroundColor;
        break;
      case "grid":
        texture = TailBacground.GrindTile(bs.grid);
        colorId = bs.grid.bacgroundColor;
        break;
      case "line":
        texture = TailBacground.HorizonalLineBacground(bs.line);
        colorId = bs.line.bacgroundColor;
        break;
    }

    if (texture) {
      backgroundTilingSprite.texture = texture;
    } else if (backgroundTilingSprite) {
      backgroundTilingSprite.texture = Texture.EMPTY;
    }
    if (colorId) {
      setBacgroundColor(colorId);
    }
  }

  function setBacgroundColor(colorID: ColorId) {
    if (!Continuum_Canvas.appInstance || !Continuum_Canvas.appInstance.renderer) return;
    Continuum_Canvas.appInstance.renderer.background.color =
      Continuum_CanvasPalet.getColor(colorID);
  }
}
