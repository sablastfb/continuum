import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { TileBacgroundSettings } from "../../features/service/TailBackground";
import { ColorId } from "../palet/PaletContainer";

export type Shape = "square" | "circle" |  "poligon";
export type ShapeFillType = "outline-only" | "fill-only" | "outline-fill";

const shapeBackgroundColors = [
  "bg-1",
  "bg-2",
  "shape-background-cornflower-blue",
  "shape-background-mint-green",
  "shape-background-blush-pink",
];

const shapeOutlineColors = [
  "bg-7",
  "shape-outline-rose-pink",
  "shape-outline-turquoise-teal",
];

export type ShapeData = TileBacgroundSettings & {
  shape: Shape,
  outlineColors: ColorId[];
  outlineColor: ColorId;
  outlineWidth: number;
  fillType: ShapeFillType;
};

export const DefaultShapeSettings: ShapeData = {
  shape: 'square',
  fillType: "outline-fill",
  outlineColors: shapeOutlineColors,
  outlineColor: shapeOutlineColors[0],
  outlineWidth: 5,
  activeBacgroundType: "color",
  backgroundColors: shapeBackgroundColors,
  color: shapeBackgroundColors[0],
  grid: {
    bacgroundColor: shapeBackgroundColors[0],
    gridBorderColor: "bgt-1",
    sizeOfGrid: 50,
    widthOfGridLine: 0.5,
  },
  dots: {
    bacgroundColor: shapeBackgroundColors[0],
    dotColor: "bgt-1",
    dotRadius: 2,
    tileWidth: 50,
  },
  line: {
    bacgroundColor: shapeBackgroundColors[0],
    lineColor: "bgt-1",
    spaceBetween: 50,
  }
};

export interface ShapeStore extends ShapeData {
}

export const useShapesStore = create<ShapeData>()(
  immer((set) => ({
    ...DefaultShapeSettings,
  }))
);
