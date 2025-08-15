import { create } from "zustand/react";
import { Color, ColorId, Thicknes, ThicknesId } from "../types/CanvasTypes";
import { immer } from "zustand/middleware/immer";

export type PencilSettings = {
  pencilColorId: ColorId;
  pencilColor: Color;
  thicknesId: ThicknesId;
  thicknes: Thicknes;
  allPencilColors: ColorId[];
  allThicknes: ThicknesId[];
  addColor: (color: ColorId) => void;
  setPencileColor: (newColor: { colorId: ColorId; color: string }) => void;
  setPencileThickens: (pencileThickens: {
    thicknesId: ThicknesId;
    thicknes: number;
  }) => void;
};

const allThicknes = ["th-1", "th-2", "th-3"];
const allPencilColors = ["p-7", "p-1", "p-2", "p-5", "p-4"];

export const usePencileStore = create<PencilSettings>()(
  immer((set) => ({
    pencilColor: "",
    thicknes: 0,
    allPencilColors: allPencilColors,
    allThicknes: allThicknes,
    pencilColorId: allPencilColors[0],
    thicknesId: allThicknes[0],
    addColor: (color) =>
      set((state) => {
        state.allPencilColors.push(color);
      }),
    setPencileColor: (color) =>
      set((state) => {
        state.pencilColorId = color.colorId;
        state.pencilColor = color.color;
      }),
    setPencileThickens: (pencileThickens) =>
      set((state) => {
        state.thicknes = pencileThickens.thicknes;
        state.thicknesId = pencileThickens.thicknesId;
      }),
  }))
);
