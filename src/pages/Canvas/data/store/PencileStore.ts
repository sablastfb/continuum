import { create } from "zustand/react";
import { Color, ColorId, Thicknes, ThicknesId } from "../types/CanvasTypes";
import { immer } from "zustand/middleware/immer";
import { DefaultSettings } from "../constants/DefaultSettings";

export type PencilSettings = {
  pencilColorId: ColorId;
  pencilColor: Color;
  thicknesId: ThicknesId;
  thicknes: Thicknes;
  setPencileColor: (newColor: { colorId: ColorId; color: string }) => void;
  setPencileThickens: (pencileThickens: {
    thicknesId: ThicknesId;
    thicknes: number;
  }) => void;
};

export const usePencileStore = create<PencilSettings>()(
  immer((set) => ({
    pencilColorId: DefaultSettings.pencile.colors[0],
    pencilColor: "",
    thicknesId: DefaultSettings.pencile.thicknes[0],
    thicknes: 0,
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
