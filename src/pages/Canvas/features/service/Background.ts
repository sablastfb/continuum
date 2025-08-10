import { Assets, Texture, TilingSprite } from "pixi.js";
import { BackgroundSettings } from "../../data/CanvasTypes";
import { Canvas } from "../CanvasApp";

export namespace CanvasBacground {
  export function changeBackground(bs: BackgroundSettings) {
    switch (bs.type) {
      case "color":
        SolidColorBacground(bs);
        break;
      case "dots":
        DotsBacground(bs);
        break;
      case "grid":
        GridBacground(bs);
        break;
      case "line":
        LineBacground(bs);
        break;
    }
  }

  function SolidColorBacground(bs: BackgroundSettings) {
    if (!Canvas.appInstance?.renderer?.background) return;
    Canvas.appInstance.renderer.background.color = bs.color;
  }

  async function DotsBacground(bs: BackgroundSettings) {
    if (!Canvas.appInstance) return;
    const bacground = bs.dots;
    const texture = await Assets.load("https://pixijs.com/assets/p2.jpeg");
    const tilingSprite = new TilingSprite({
        texture: texture,
        width: Canvas.appInstance.renderer.width,
        height: Canvas.appInstance.renderer.height,
    });
    tilingSprite.zIndex = -1;
    Canvas.appInstance.stage.addChild(tilingSprite);
    Canvas.backgroundTexture = tilingSprite;
  }

  function GridBacground(bs: BackgroundSettings) {}
  function LineBacground(bs: BackgroundSettings) {}
}
