import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ColorId } from "../palet/PaletContainer";

export type Shape = "square" | "circle" | "poligon";
export type ShapeFillType = "outline-only" | "fill-only" | "outline-and-fill";

const shapeBackgroundColors = [
  "shape-background-mist-blue",
  "shape-background-cool-gray",
];

const shapeOutlineColors = ["shape-outline-ash", "shape-outline-stone"];

export const SHAPE_PATTERN_TYPES = ["color", "grid", "dots", "line"] as const;

export type ShapePatternTypes = typeof SHAPE_PATTERN_TYPES[number];

export const shapePatternShaderIdMapper: Record<ShapePatternTypes, number> = {
  color: 0,
  grid: 1,
  dots: 2,
  line: 3,
};

export type SolidColorBackground = ColorId;

export type GridBackground = {};
export type DotBackground = {
  dotRadius: number;
  tileWidth: number;
};
export type LineBackground = {};

export type ShapePatternSettings = {
  activeBacgroundType: ShapePatternTypes;
  fillColorId: ColorId;
  fillColors: ColorId[];
  grid: GridBackground;
  dots: DotBackground;
  line: LineBackground;
};

export type ShapeData = ShapePatternSettings & {
  shape: Shape;
  strokeColors: ColorId[];
  strokeColorId: ColorId;
  strokeSize: number;
  numberOfCorners: number;
  cornerRadius: number;
  fillType: ShapeFillType;
  lineColor: ColorId;
  spaceBetweenLines: number;
  widthOfLine: number;
};

export const DefaultShapeSettings: ShapeData = {
  shape: "square",
  fillType: "outline-and-fill",
  strokeSize: 5,
  cornerRadius: 20,
  numberOfCorners: 6,
  activeBacgroundType: "color",
  strokeColorId: shapeOutlineColors[0],
  strokeColors: shapeOutlineColors,
  fillColorId: shapeBackgroundColors[0],
  fillColors: shapeBackgroundColors,
  lineColor: shapeBackgroundColors[1],
  spaceBetweenLines: 50,
  widthOfLine: 0.5,
  grid: {},
  dots: {
    dotRadius: 2,
    tileWidth: 50,
  },
  line: {},
};

export interface ShapeStore extends ShapeData {
  updateShape: (state: Partial<ShapeData>) => void;
}

export const useShapesStore = create<ShapeStore>()(
  immer((set) => ({
    ...DefaultShapeSettings,
    updateShape: (partialState) =>
      set((state) => {
        Object.assign(state, partialState);
      }),
  }))
);
