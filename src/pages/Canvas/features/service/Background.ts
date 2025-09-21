import { Graphics, TilingSprite } from "pixi.js";
import { Continuum_Canvas } from "../CanvasApp";
import { CanvasPalet } from "../../data/container/PaletContainer";
import { BackgroundSettings } from "../../data/store/SettingsStore";
import { Continuum_CanvasViewport } from "./Viewport";

export namespace Continuum_CanvasBacground {
  export let backgroundTexture: TilingSprite;

  export function changeBackground(bs: BackgroundSettings) {
    switch (bs.activeBacgroundType) {
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
    Continuum_Canvas.appInstance?.stage.removeChild(backgroundTexture);
  }

  function SolidColorBacground(bs: BackgroundSettings) {
    if (!Continuum_Canvas.appInstance?.renderer?.background) return;
    ClearBackground();
    Continuum_Canvas.appInstance.renderer.background.color = CanvasPalet.getColor(
      bs.color
    );
  }

  async function DotsBacground(bs: BackgroundSettings) {
    if (!Continuum_Canvas.appInstance || !Continuum_Canvas.appInstance.renderer) return;
    ClearBackground();

    const bacground = bs.dots;
    Continuum_Canvas.appInstance.renderer.background.color = CanvasPalet.getColor(
      bacground.bacgroundColor
    );

    const graphics = new Graphics()
      .rect(0, 0, bacground.width, bacground.width)
      .fill({ alpha: 0 })
      .circle(0, 0, bacground.radius)
      .fill(CanvasPalet.getColor(bacground.dotColor));

    const texture = Continuum_Canvas.appInstance.renderer.generateTexture(graphics);
    const tilingSprite = new TilingSprite({
      texture: texture,
      width: Continuum_Canvas.appInstance.renderer.width,
      height: Continuum_Canvas.appInstance.renderer.height,
    });
    tilingSprite.zIndex = -1;
    Continuum_Canvas.appInstance.stage.addChild(tilingSprite);
    backgroundTexture = tilingSprite;
    resize();
  }

  function GridBacground(bs: BackgroundSettings) {
    if (!Continuum_Canvas.appInstance || !Continuum_Canvas.appInstance.renderer) return;
    ClearBackground();
    const bacground = bs.grid;
    Continuum_Canvas.appInstance.renderer.background.color = CanvasPalet.getColor(
      bacground.bacgroundColor
    );

    const graphics = new Graphics();
    const width = 70;

    graphics
      .rect(0, 0, width, width)
      .stroke({ color: CanvasPalet.getColor(bacground.gridColor), width: 1});

    const texture = Continuum_Canvas.appInstance.renderer.generateTexture(graphics);
    const tilingSprite = new TilingSprite({
      texture: texture,
      width: Continuum_Canvas.appInstance.renderer.width,
      height: Continuum_Canvas.appInstance.renderer.height,
    });
    tilingSprite.zIndex = -1;
    Continuum_Canvas.appInstance.stage.addChild(tilingSprite);
    backgroundTexture = tilingSprite;
    resize();
  }

  function LineBacground(bs: BackgroundSettings) {
    if (!Continuum_Canvas.appInstance || !Continuum_Canvas.appInstance.renderer) return;
    ClearBackground();

    const bacground = bs.line;
    Continuum_Canvas.appInstance.renderer.background.color = CanvasPalet.getColor(
      bacground.bacgroundColor
    );

    const graphics = new Graphics();
    const width = 100;
    graphics
      .rect(0, 0, width, width)
      .stroke({ color: CanvasPalet.getColor(bacground.lineColor), width: 0.5 })
      .moveTo(0, 0)
      .lineTo(0, width)
      .moveTo(0, 0)
      .lineTo(width, 0)
      .lineTo(width, width)
      .stroke({
        color: CanvasPalet.getColor(bacground.bacgroundColor),
        width: 1,
      });

    const texture = Continuum_Canvas.appInstance.renderer.generateTexture(graphics);
    const tilingSprite = new TilingSprite({
      texture: texture,
      width: Continuum_Canvas.appInstance.renderer.width,
      height: Continuum_Canvas.appInstance.renderer.height,
    });
    tilingSprite.zIndex = -1;
    Continuum_Canvas.appInstance.stage.addChild(tilingSprite);
    backgroundTexture = tilingSprite;

    resize();
  }

  function resize() {
    if (backgroundTexture && Continuum_CanvasViewport.viewport?.scale.x) {
      backgroundTexture.tilePosition.x = Continuum_CanvasViewport.viewport?.x;
      backgroundTexture.tilePosition.y = Continuum_CanvasViewport.viewport?.y;
      if (backgroundTexture && Continuum_CanvasViewport.viewport?.scale.x) {
        backgroundTexture.tileScale.x = Continuum_CanvasViewport.viewport?.scale.x;
        backgroundTexture.tileScale.y = Continuum_CanvasViewport.viewport?.scale.y;
      }
    }
  }
}
