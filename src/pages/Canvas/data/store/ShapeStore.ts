import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { TileBacgroundSettings } from "../../features/service/TailBackground";
import { ColorId } from "../palet/PaletContainer";

export type Shape = "square" | "circle" | "poligon";
export type ShapeFillType = "outline-only" | "fill-only" | "outline-fill";

const shapeBackgroundColors = [
  "shape-background-mist-blue",
  "shape-background-cool-gray",
];

const shapeOutlineColors = [
  "shape-outline-ash",
  "shape-outline-stone"
];

export type ShapeData = TileBacgroundSettings & {
  shape: Shape;
  strokeColors: ColorId[];
  strokeColorId: ColorId;
  stroke: number;
  numberOfCorners: number,
  cornerRadius: number;
  fillType: ShapeFillType;
};

export const DefaultShapeSettings: ShapeData = {
  shape: "square",
  fillType: "outline-fill",
  stroke: 5,
  cornerRadius: 20,
  numberOfCorners: 6,
  activeBacgroundType: "color",
  strokeColorId: shapeOutlineColors[0],
  strokeColors: shapeOutlineColors,
  fillColorId: shapeBackgroundColors[0],
  fillColors: shapeBackgroundColors,
  grid: {
    gridBorderColor: "bgt-1",
    sizeOfGrid: 50,
    widthOfGridLine: 0.5,
  },
  dots: {
    dotColor: "bgt-1",
    dotRadius: 2,
    tileWidth: 50,
  },
  line: {
    lineColor: "bgt-1",
    spaceBetween: 50,
  },
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
