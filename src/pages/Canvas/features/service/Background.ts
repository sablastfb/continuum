import { Graphics, TilingSprite } from "pixi.js";
import { BackgroundSettings } from "../../data/types/CanvasTypes";
import { Canvas } from "../CanvasApp";
import { CanvasPalet } from "../../data/container/PaletContainer";

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
    Canvas.backgroundTexture = tilingSprite;
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
    Canvas.backgroundTexture = tilingSprite;
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
    Canvas.backgroundTexture = tilingSprite;

   resize();
  }
  function resize(){
    if (Canvas.backgroundTexture && Canvas.viewport?.scale.x) {
      Canvas.backgroundTexture.tilePosition.x = Canvas.viewport?.x;
      Canvas.backgroundTexture.tilePosition.y = Canvas.viewport?.y;
      if (Canvas.backgroundTexture && Canvas.viewport?.scale.x) {
        Canvas.backgroundTexture.tileScale.x = Canvas.viewport?.scale.x;
        Canvas.backgroundTexture.tileScale.y = Canvas.viewport?.scale.y;
      }
    }
  }
}
