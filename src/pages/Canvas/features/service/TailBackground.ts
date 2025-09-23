/**
 *  Create TilingSprite for bacground and shapes
 */

import { Graphics } from "pixi.js";
import { Continuum_CanvasPalet, ColorId } from "../../data/palet/PaletContainer";
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

export namespace TailBacground {
  export function GrindTile(grid: GridBackground) {
    if (!Continuum_Canvas.IsCanvasReady()) return;

    const graphics = new Graphics();
    const width = grid.sizeOfGrid;

    graphics.rect(0, 0, width, width).stroke({
      color: Continuum_CanvasPalet.getColor(grid.gridBorderColor),
      width: grid.widthOfGridLine,
      cap: "round",
      alpha: 0.7,
    });

    return Continuum_Canvas.appInstance!.renderer.generateTexture(graphics);
  }

  export function DotBacground(dots: DotBackground) {
    if (!Continuum_Canvas.IsCanvasReady()) return;
    const graphics = new Graphics()
      .rect(0, 0, dots.tileWidth, dots.tileWidth)
      .fill({ alpha: 0 })
      .circle(0, 0, dots.dotRadius)
      .fill({ color: Continuum_CanvasPalet.getColor(dots.dotColor), alpha: 0.7 });
    return Continuum_Canvas.appInstance!.renderer.generateTexture(graphics);
  }

  export function HorizonalLineBacground(line: LineBackground) {
    if (!Continuum_Canvas.IsCanvasReady()) return;

    const graphics = new Graphics();
    const height = line.spaceBetween;
    // Draw horizontal line at the bottom of the tile
    graphics
      .moveTo(0, 0)
      .lineTo(height, 0)
      .stroke({
        width: 1,
        color: Continuum_CanvasPalet.getColor(line.lineColor),
        alpha: 0.7,
      })
      .moveTo(0, height)
      .lineTo(height, height)
      .stroke({
         width: 1,
        color: Continuum_CanvasPalet.getColor(line.lineColor),
        alpha: 0.7,
      });

    return Continuum_Canvas.appInstance!.renderer.generateTexture(graphics);
  }
}
