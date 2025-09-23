import { create } from "zustand/react";
import { immer } from "zustand/middleware/immer";
import { Color, ColorId } from "../palet/PaletContainer";
import { Thicknes, ThicknesId } from "../thicknes/ThickneContainer";

export type MarkerSettings = {
  markerColorId: ColorId;
  markerColor: Color;
  thicknesId: ThicknesId;
  thicknes: Thicknes;
  allmarkerColors: ColorId[];
  allThicknes: ThicknesId[];
  addColor: (color: ColorId) => void;
  setMarkereColor: (newColor: { colorId: ColorId; color: string }) => void;
  setmarkereThickens: (markereThickens: {
    thicknesId: ThicknesId;
    thicknes: number;
  }) => void;
};

const allMarkerThicknes = ["th-0", "th-1", "th-2", "th-3"];
const allMarkerColors = ["marker-yellow", "marker-orange", "marker-green", "marker-pink" ];

export const useMarkerStore = create<MarkerSettings>()(
  immer((set) => ({
    markerColor: "",
    thicknes: 0,
    allmarkerColors: allMarkerColors,
    allThicknes: allMarkerThicknes,
    markerColorId: allMarkerColors[0],
    thicknesId: allMarkerThicknes[0],
    addColor: (color) =>
      set((state) => {
        state.allmarkerColors.push(color);
      }),
    setMarkereColor: (color) =>
      set((state) => {
        state.markerColorId = color.colorId;
        state.markerColor = color.color;
      }),
    setmarkereThickens: (markereThickens) =>
      set((state) => {
        state.thicknes = markereThickens.thicknes;
        state.thicknesId = markereThickens.thicknesId;
      }),
  }))
);
