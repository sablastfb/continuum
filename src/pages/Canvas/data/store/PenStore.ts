import { create } from "zustand/react";
import { immer } from "zustand/middleware/immer";
import { Color, ColorId } from "../palet/PaletContainer";
import { Thicknes, ThicknesId } from "../thicknes/ThickneContainer";

export type PenSettings = {
  penColorId: ColorId;
  penColor: Color;
  thicknesId: ThicknesId;
  thicknes: Thicknes;
  allPencilColors: ColorId[];
  allThicknes: ThicknesId[];
  addColor: (color: ColorId) => void;
  setPenColor: (newColor: { colorId: ColorId; color: string }) => void;
  setPenThickens: (penThickens: {
    thicknesId: ThicknesId;
    thicknes: number;
  }) => void;
};

const allPencilThicknes = ["th-0", "th-1", "th-2", "th-3"];
const allPencilColors = ["p-7", "p-1", "p-2", "p-5", "p-4"];

export const usePenStore = create<PenSettings>()(
  immer((set) => ({
    penColor: "",
    thicknes: 0,
    allPencilColors: allPencilColors,
    allThicknes: allPencilThicknes,
    penColorId: allPencilColors[0],
    thicknesId: allPencilThicknes[0],
    addColor: (color) =>
      set((state) => {
        state.allPencilColors.push(color);
      }),
    setPenColor: (color) =>
      set((state) => {
        state.penColorId = color.colorId;
        state.penColor = color.color;
      }),
    setPenThickens: (penThickens) =>
      set((state) => {
        state.thicknes = penThickens.thicknes;
        state.thicknesId = penThickens.thicknesId;
      }),
  }))
);
