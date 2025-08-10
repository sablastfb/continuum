import { Assets, Graphics, Texture, TilingSprite } from "pixi.js";
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

  function ClearBackground() {
    if (!Canvas.backgroundTexture) return;

    Canvas.appInstance?.stage.removeChild(Canvas.backgroundTexture);
  }

  function SolidColorBacground(bs: BackgroundSettings) {
    if (!Canvas.appInstance?.renderer?.background) return;
    ClearBackground();
    Canvas.appInstance.renderer.background.color = bs.color;
  }

  async function DotsBacground(bs: BackgroundSettings) {
    if (!Canvas.appInstance || !Canvas.appInstance.renderer) return;
    ClearBackground();

    const bacground = bs.dots;
    Canvas.appInstance.renderer.background.color = bacground.bacgroundColor;

    const graphics = new Graphics()
      .rect(0, 0, bacground.width, bacground.width)
      .fill({ color: "#323232", alpha: 0 })
      .circle(0, 0, bacground.radius)
      .fill("#323232");

    const texture = Canvas.appInstance.renderer.generateTexture(graphics);
    const tilingSprite = new TilingSprite({
      texture: texture,
      width: Canvas.appInstance.renderer.width,
      height: Canvas.appInstance.renderer.height,
    });
    tilingSprite.tilePosition.x -= bacground.width / 2;
    tilingSprite.tilePosition.y -= bacground.width / 2;
    tilingSprite.zIndex = -1;
    Canvas.appInstance.stage.addChild(tilingSprite);
    Canvas.backgroundTexture = tilingSprite;
  }

  function GridBacground(bs: BackgroundSettings) {
    if (!Canvas.appInstance || !Canvas.appInstance.renderer) return;
    ClearBackground();
    const bacground = bs.grid;
    Canvas.appInstance.renderer.background.color = bacground.bacgroundColor;

    const graphics = new Graphics();
    const width = 100;

    graphics
      .rect(0, 0, width, width)
      .stroke({ color: "#323232", width: 1 })
      .moveTo(0, 0)
      .lineTo(0, width)
      .moveTo(0, 0)
      .lineTo(width, 0)
      .stroke({ color: bacground.bacgroundColor, width: 1 });

    const texture = Canvas.appInstance.renderer.generateTexture(graphics);
    const tilingSprite = new TilingSprite({
      texture: texture,
      width: Canvas.appInstance.renderer.width,
      height: Canvas.appInstance.renderer.height,
    });
    tilingSprite.tilePosition.x -= -width / 2;
    tilingSprite.tilePosition.y -= -width / 2;
    tilingSprite.zIndex = -1;
    Canvas.appInstance.stage.addChild(tilingSprite);
    Canvas.backgroundTexture = tilingSprite;
  }

  function LineBacground(bs: BackgroundSettings) {
    if (!Canvas.appInstance || !Canvas.appInstance.renderer) return;
    ClearBackground();

    const bacground = bs.line;
    Canvas.appInstance.renderer.background.color = bacground.bacgroundColor;

    const graphics = new Graphics();
    const width = 100;
    graphics
      .rect(0, 0, width, width)
      .stroke({ color: "#323232", width: 1 })
      .moveTo(0, 0)
      .lineTo(0, width)
      .moveTo(0, 0)
      .lineTo(width, 0)
      .lineTo(width, width)
      .stroke({ color: bacground.bacgroundColor, width: 1 });

    const texture = Canvas.appInstance.renderer.generateTexture(graphics);
    const tilingSprite = new TilingSprite({
      texture: texture,
      width: Canvas.appInstance.renderer.width,
      height: Canvas.appInstance.renderer.height,
    });
    tilingSprite.tilePosition.x -= width / 2;
    tilingSprite.tilePosition.y -= width / 2;
    tilingSprite.zIndex = -1;
    Canvas.appInstance.stage.addChild(tilingSprite);
    Canvas.backgroundTexture = tilingSprite;
  }
}
