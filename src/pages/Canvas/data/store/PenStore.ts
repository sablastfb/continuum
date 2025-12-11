import { create } from "zustand/react";
import { immer } from "zustand/middleware/immer";
import { Color, ColorId } from "../palet/PaletContainer";
import { Thicknes, ThicknesId } from "../thicknes/ThickneContainer";

const allPencilThicknes = ["th-0", "th-1", "th-2", "th-3"];
const allPencilColors = ["p-7", "p-1", "p-2", "p-5", "p-4"];
const allMarkerColors = [
  "marker-yellow",
  "marker-orange",
  "marker-green",
  "marker-pink",
];

export type CurveSettings = {
  penSettings: {
    color: Color; // TODO probably can remove
    colorId: ColorId;
    thicknesId: ThicknesId;
    thicknes: Thicknes;
    allThicknes: ThicknesId[];
    allPencilColors: ColorId[];
  };
  markerSettings: {
    color: Color;
    colorId: ColorId;
    thicknesId: ThicknesId;
    thicknes: Thicknes;
    opacity: number;
    allThicknes: ThicknesId[];
    allMarkerColors: ColorId[];
  };
  setPenColor: (newColor: { colorId: ColorId; color: string }) => void;
  setPenThickens: (penThickens: {
    thicknesId: ThicknesId;
    thicknes: number;
  }) => void;
  setMarkerColor: (newColor: { colorId: ColorId; color: string }) => void;
  setMarkerThicknes: (penThickens: {
    thicknesId: ThicknesId;
    thicknes: number;
  }) => void;
};

export const useCurveStore = create<CurveSettings>()(
  immer((set) => ({
    penSettings: {
      color: "", // TODO probably can remove
      colorId: allPencilColors[0],
      thicknes: 0,
      thicknesId: allPencilThicknes[0],
      allThicknes: allPencilThicknes,
      allPencilColors: allPencilColors,
    },
    markerSettings: {
      color: "",
      colorId: allMarkerColors[0],
      opacity: 1.0,
      thicknes: 0,
      thicknesId: allPencilThicknes[0],
      allThicknes: allPencilThicknes,
      allMarkerColors: allMarkerColors,
    },
    setPenColor: (color) =>
      set((state) => {
        state.penSettings.colorId = color.colorId;
        state.penSettings.color = color.color;
      }),
    setPenThickens: (penThickens) =>
      set((state) => {
        state.penSettings.thicknes = penThickens.thicknes;
        state.penSettings.thicknesId = penThickens.thicknesId;
      }),
    setMarkerColor: (color) =>
      set((state) => {
        state.markerSettings.colorId = color.colorId;
        state.markerSettings.color = color.color;
      }),
    setMarkerThicknes: (penThickens) =>
      set((state) => {
        state.markerSettings.thicknes = penThickens.thicknes;
        state.markerSettings.thicknesId = penThickens.thicknesId;
      }),
  }))
);
