import { ColorId } from "../palet/PaletContainer";

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
