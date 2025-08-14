import { Graphics, TilingSprite } from "pixi.js";
import { Canvas } from "../CanvasApp";
import { CanvasPalet } from "../../data/container/PaletContainer";
import { BackgroundSettings } from "../../data/store/SettingsStore";

export namespace CanvasBacground {
  export let backgroundTexture: TilingSprite;

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
    if (!backgroundTexture) return;

    Canvas.appInstance?.stage.removeChild(backgroundTexture);
  }

  function SolidColorBacground(bs: BackgroundSettings) {
    if (!Canvas.appInstance?.renderer?.background) return;
    ClearBackground();
    Canvas.appInstance.renderer.background.color = CanvasPalet.getColor(
      bs.color
    );
  }

  async function DotsBacground(bs: BackgroundSettings) {
    if (!Canvas.appInstance || !Canvas.appInstance.renderer) return;
    ClearBackground();

    const bacground = bs.dots;
    Canvas.appInstance.renderer.background.color = CanvasPalet.getColor(
      bacground.bacgroundColor
    );

    const graphics = new Graphics()
      .rect(0, 0, bacground.width, bacground.width)
      .fill({ alpha: 0 })
      .circle(0, 0, bacground.radius)
      .fill(CanvasPalet.getColor(bacground.dotColor));

    const texture = Canvas.appInstance.renderer.generateTexture(graphics);
    const tilingSprite = new TilingSprite({
      texture: texture,
      width: Canvas.appInstance.renderer.width,
      height: Canvas.appInstance.renderer.height,
    });
    tilingSprite.zIndex = -1;
    Canvas.appInstance.stage.addChild(tilingSprite);
    backgroundTexture = tilingSprite;
   resize();

  }

  function GridBacground(bs: BackgroundSettings) {
    if (!Canvas.appInstance || !Canvas.appInstance.renderer) return;
    ClearBackground();
    const bacground = bs.grid;
    Canvas.appInstance.renderer.background.color = CanvasPalet.getColor(
      bacground.bacgroundColor
    );

    const graphics = new Graphics();
    const width = 100;

    graphics
      .rect(0, 0, width, width)
      .stroke({ color: CanvasPalet.getColor(bacground.gridColor), width: 1 })
      .moveTo(0, 0)
      .lineTo(0, width)
      .moveTo(0, 0)
      .lineTo(width, 0)
      .stroke({
        color: CanvasPalet.getColor(bacground.bacgroundColor),
        width: 1,
      });

    const texture = Canvas.appInstance.renderer.generateTexture(graphics);
    const tilingSprite = new TilingSprite({
      texture: texture,
      width: Canvas.appInstance.renderer.width,
      height: Canvas.appInstance.renderer.height,
    });
    tilingSprite.zIndex = -1;
    Canvas.appInstance.stage.addChild(tilingSprite);
    backgroundTexture = tilingSprite;
   resize();

  }

  function LineBacground(bs: BackgroundSettings) {
    if (!Canvas.appInstance || !Canvas.appInstance.renderer) return;
    ClearBackground();

    const bacground = bs.line;
    Canvas.appInstance.renderer.background.color = CanvasPalet.getColor(
      bacground.bacgroundColor
    );

    const graphics = new Graphics();
    const width = 100;
    graphics
      .rect(0, 0, width, width)
      .stroke({ color: CanvasPalet.getColor(bacground.lineColor), width: 1 })
      .moveTo(0, 0)
      .lineTo(0, width)
      .moveTo(0, 0)
      .lineTo(width, 0)
      .lineTo(width, width)
      .stroke({
        color: CanvasPalet.getColor(bacground.bacgroundColor),
        width: 1,
      });

    const texture = Canvas.appInstance.renderer.generateTexture(graphics);
    const tilingSprite = new TilingSprite({
      texture: texture,
      width: Canvas.appInstance.renderer.width,
      height: Canvas.appInstance.renderer.height,
    });
    tilingSprite.zIndex = -1;
    Canvas.appInstance.stage.addChild(tilingSprite);
    backgroundTexture = tilingSprite;

   resize();
  }
  function resize(){
    if (backgroundTexture && Canvas.viewport?.scale.x) {
      backgroundTexture.tilePosition.x = Canvas.viewport?.x;
      backgroundTexture.tilePosition.y = Canvas.viewport?.y;
      if (backgroundTexture && Canvas.viewport?.scale.x) {
        backgroundTexture.tileScale.x = Canvas.viewport?.scale.x;
        backgroundTexture.tileScale.y = Canvas.viewport?.scale.y;
      }
    }
  }
}
