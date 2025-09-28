/**
 *  Create TilingSprite for bacground and shapes
 */

import { Graphics, RenderTexture } from "pixi.js";
import {
  Continuum_CanvasPalet,
  ColorId,
} from "../../data/palet/PaletContainer";
import { Continuum_Canvas } from "../CanvasApp";

export type BackgroundTypes = "color" | "grid" | "dots" | "line";
export type SolidColorBackground = ColorId;
export type GridBackground = {
  bacgroundColor: ColorId;
  gridBorderColor: ColorId;
  sizeOfGrid: number;
  widthOfGridLine: number;
};
export type DotBackground = {
  bacgroundColor: ColorId;
  dotColor: ColorId;
  dotRadius: number;
  tileWidth: number;
};
export type LineBackground = {
  bacgroundColor: ColorId;
  lineColor: ColorId;
  spaceBetween: number;
};
export type TileBacground =
  | SolidColorBackground
  | GridBackground
  | DotBackground
  | LineBackground;

export type TileBacgroundSettings = {
  activeBacgroundType: BackgroundTypes;
  color: SolidColorBackground;
  grid: GridBackground;
  dots: DotBackground;
  line: LineBackground;
  backgroundColors: ColorId[];
};

export namespace Continuum_TailBacground {
   export function GrindTile(grid: GridBackground) {
    if (!Continuum_Canvas.IsCanvasReady()) return;

    const graphics = new Graphics();
    const width = grid.sizeOfGrid;

    const color = Continuum_CanvasPalet.getColor(grid.gridBorderColor)  ;
    const bacground =  Continuum_CanvasPalet.getColor(grid.bacgroundColor);
    const line = grid.widthOfGridLine;
   graphics
      .rect(0, 0, width, width)
      .fill(bacground)
      .fill()
      .rect(0, 0, width, line)
      .rect(0, width, width, line)
      .rect(0, 0, line, width)
      .rect(width, 0, line, width)
      .fill(color);

    const renderTexture = RenderTexture.create({
      width: width,
      height: width,
      antialias: false,
      alphaMode: "premultiplied-alpha",
    });

    Continuum_Canvas.appInstance!.renderer.render({
      container: graphics,
      target: renderTexture,
      clear: true,
    });

    return renderTexture;
  }

  export function DotBacground(dots: DotBackground) {
    if (!Continuum_Canvas.IsCanvasReady()) return;
    const graphics = new Graphics()
      .rect(0, 0, dots.tileWidth, dots.tileWidth)
      .fill({ color: Continuum_CanvasPalet.getColor(dots.bacgroundColor) })
      .stroke({
        color: Continuum_CanvasPalet.getColor(dots.bacgroundColor),
        width: 1,
      })
      .circle(dots.tileWidth / 2, dots.tileWidth / 2, dots.dotRadius)
      .fill({
        color: Continuum_CanvasPalet.getColor(dots.dotColor),
      });
    return Continuum_Canvas.appInstance!.renderer.generateTexture(graphics);
  }

  export function HorizonalLineBacground(line: LineBackground) {
    if (!Continuum_Canvas.IsCanvasReady()) return;

    const graphics = new Graphics();
    const height = line.spaceBetween;
    const color = line.lineColor;
    // Draw horizontal line at the bottom of the tile
    graphics
      .rect(0, 0, 100, 95)
      .fill(Continuum_CanvasPalet.getColor(line.bacgroundColor))
      .fill()
      .rect(0, 0, 100, 1)
      .rect(0, height, 100, 1)
      .fill(Continuum_CanvasPalet.getColor(color));

    return Continuum_Canvas.appInstance!.renderer.generateTexture(graphics);
  }
}
