import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { TileBacgroundSettings } from "../../features/service/TailBackground";

export type ShapeData = TileBacgroundSettings;

const shapeBackgroundColors = ["bg-1", "bg-2", "bg-3", "bg-5"];
export const DefaultShapeSettings: ShapeData = {
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
  },
};
export interface ShapeStore extends ShapeData {}

export const useShapeStore = create<ShapeStore>()(
  immer((set) => ({
    ...DefaultShapeSettings,
  }))
);
