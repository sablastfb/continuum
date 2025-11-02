/**
 *  Create TilingSprite for bacground and shapes
 */

import { Graphics, RenderTexture } from "pixi.js";
import {
  ColorPalet,
  ColorId,
} from "../../data/palet/PaletContainer";
import { Continuum_Canvas } from "../CanvasApp";
import useCanvasStore from "../../data/store/CanvasStore";

export type BackgroundTypes = "color" | "grid" | "dots" | "line";
export type SolidColorBackground = ColorId;
export type GridBackground = {
  gridBorderColor: ColorId;
  sizeOfGrid: number;
  widthOfGridLine: number;
};
export type DotBackground = {
  dotColor: ColorId;
  dotRadius: number;
  tileWidth: number;
};
export type LineBackground = {
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
  fillColorId: ColorId;
  fillColors: ColorId[];
  grid: GridBackground;
  dots: DotBackground;
  line: LineBackground;
};

export namespace Continuum_TailBacground {

  export function GrindTile(grid: GridBackground, bacgroundColorId: ColorId) {
    if (!Continuum_Canvas.IsCanvasReady()) return;

    const graphics = new Graphics();
    // const zoom = useCanvasStore.getState().zoome;
    const width = grid.sizeOfGrid ;
    // const line =  1 ;

    const color = Continuum_Canvas.colorPalet.getColor(grid.gridBorderColor);
    const bacground = Continuum_Canvas.colorPalet.getColor(bacgroundColorId);
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

  export function DotBacground(dots: DotBackground,bacgroundColorId: ColorId ) {
    if (!Continuum_Canvas.IsCanvasReady()) return;
    const zoom = useCanvasStore.getState().zoome;

    const width = dots.tileWidth*zoom ;
    const radius = dots.dotRadius*zoom ;
    const bacground = Continuum_Canvas.colorPalet.getColor(bacgroundColorId);

    const graphics = new Graphics()
      .rect(0, 0, width, width)
      .fill({ color: bacground})
      .circle(radius, radius, radius)
      .fill({
        color: Continuum_Canvas.colorPalet.getColor(dots.dotColor),
      });

    const renderTexture = RenderTexture.create({
      width: width,
      height: width,
      scaleMode: "linear",
    });

    Continuum_Canvas.appInstance!.renderer.render({
      container: graphics,
      target: renderTexture,
      clear: true,
    });

    return renderTexture;
  }

  export function HorizonalLineBacground(line: LineBackground, bacgroundColorId: ColorId) {
    if (!Continuum_Canvas.IsCanvasReady()) return;
    const zoom = useCanvasStore.getState().zoome;

    const graphics = new Graphics();
    const height = line.spaceBetween * zoom;
    const color = line.lineColor;
    const bacground = Continuum_Canvas.colorPalet.getColor(bacgroundColorId);

    // Draw horizontal line at the bottom of the tile
    graphics
      .rect(0, 0, height, height)
      .fill(bacground)
      .fill()
      .rect(0, 0, height, 1)
      .rect(0, height, height, 1)
      .fill(Continuum_Canvas.colorPalet.getColor(color));

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
