import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { TileBacgroundSettings } from "../../features/service/TailBackground";
import { ColorId } from "../palet/PaletContainer";

export type ShapeFillType = "outline-only" | "fill-only" | "outline-fill";

export type ShapeData = TileBacgroundSettings & {
  outlineColors: ColorId[];
  outlineColor: ColorId;
  outlineWidth: number;
  fillType: ShapeFillType;
};

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
export const DefaultShapeSettings: ShapeData = {
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
  },
};


export interface ShapesStore {
  shapes: {
    square: ShapeData;
    circle: ShapeData;
    hexagon: ShapeData;
    poligon: ShapeData;
  };
  updateShape: (
    shapeType: keyof ShapesStore["shapes"],
    data: Partial<ShapeData>
  ) => void;
}
export const useShapesStore = create<ShapesStore>()(
  immer((set) => ({
    shapes: {
      square: { ...DefaultShapeSettings },
      circle: { ...DefaultShapeSettings },
      hexagon: { ...DefaultShapeSettings },
      poligon: { ...DefaultShapeSettings },
    },
    updateShape: (shapeType, newData) =>
      set((state) => {
        state.shapes[shapeType] = { ...state.shapes[shapeType], ...newData };
      }),
  }))
);
