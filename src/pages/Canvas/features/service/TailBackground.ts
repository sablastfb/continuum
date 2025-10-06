/**
 *  Create TilingSprite for bacground and shapes
 */

import { Graphics, RenderTexture } from "pixi.js";
import {
  Continuum_CanvasPalet,
  ColorId,
} from "../../data/palet/PaletContainer";
import { Continuum_Canvas } from "../CanvasApp";
import useSettingsStore from "../../data/store/BacgroundStore";
import useCanvasStore from "../../data/store/CanvasStore";

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
  export const tailScale = 6;

  export function GrindTile(grid: GridBackground) {
    if (!Continuum_Canvas.IsCanvasReady()) return;

    const graphics = new Graphics();
    const zoom = useCanvasStore.getState().zoome;
    const width = grid.sizeOfGrid / tailScale ;
    const line =  1 ;

    const color = Continuum_CanvasPalet.getColor(grid.gridBorderColor);
    const bacground = Continuum_CanvasPalet.getColor(grid.bacgroundColor);
    graphics
      .rect(0, 0, width, width)
      .fill(bacground)
      // .rect(0, 0, width, line)
      // .rect(0, 0, line, width)
      .stroke({color, width: 1.2, alpha:0.5});

    const renderTexture = RenderTexture.create({
      width: width,
      height: width,
      scaleMode: "nearest",
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
    const zoom = useCanvasStore.getState().zoome;

    const width = dots.tileWidth * zoom;
    const graphics = new Graphics()
      .rect(0, 0, width, width)
      .fill({ color: Continuum_CanvasPalet.getColor(dots.bacgroundColor) })
      .stroke({
        color: Continuum_CanvasPalet.getColor(dots.bacgroundColor),
        width: 1,
      })
      .circle(width / 2, width / 2, dots.dotRadius)
      .fill({
        color: Continuum_CanvasPalet.getColor(dots.dotColor),
      });

    const renderTexture = RenderTexture.create({
      width: width,
      height: width,
      scaleMode: "nearest",
    });

    Continuum_Canvas.appInstance!.renderer.render({
      container: graphics,
      target: renderTexture,
      clear: true,
    });

    return renderTexture;
  }

  export function HorizonalLineBacground(line: LineBackground) {
    if (!Continuum_Canvas.IsCanvasReady()) return;
    const zoom = useCanvasStore.getState().zoome;

    const graphics = new Graphics();
    const height = line.spaceBetween * zoom;
    const color = line.lineColor;
    // Draw horizontal line at the bottom of the tile
    graphics
      .rect(0, 0, height, height)
      .fill(Continuum_CanvasPalet.getColor(line.bacgroundColor))
      .fill()
      .rect(0, 0, height, 1)
      .rect(0, height, height, 1)
      .fill(Continuum_CanvasPalet.getColor(color));

    const renderTexture = RenderTexture.create({
      width: height,
      height: height,
      scaleMode: "nearest",
    });

    Continuum_Canvas.appInstance!.renderer.render({
      container: graphics,
      target: renderTexture,
      clear: true,
    });

    return renderTexture;
  }
}
