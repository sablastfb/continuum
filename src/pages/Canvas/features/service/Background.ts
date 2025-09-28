import { Texture, TilingSprite } from "pixi.js";
import { Continuum_Canvas } from "../CanvasApp";
import { Continuum_TailBacground, TileBacgroundSettings } from "./TailBackground";
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
        colorId = bs.color;
        break;
      case "dots":
        texture = Continuum_TailBacground.DotBacground(bs.dots);
        break;
      case "grid":
        texture = Continuum_TailBacground.GrindTile(bs.grid);
        break;
      case "line":
        texture = Continuum_TailBacground.HorizonalLineBacground(bs.line);
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
