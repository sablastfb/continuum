import { create } from "zustand/react";
import { immer } from "zustand/middleware/immer";
import {Thickness, ThicknessId} from "../thicknes/ThickneContainer";
import { Color, ColorId } from "../palet/PaletteContainer";

const allPencilThickness = ["th-0", "th-1", "th-2", "th-3"];
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
    thicknessId: ThicknessId;
    thickness: Thickness;
    allThickness: ThicknessId[];
    allPencilColors: ColorId[];
  };
  markerSettings: {
    color: Color;
    colorId: ColorId;
    thicknessId: ThicknessId;
    thickness: Thickness;
    opacity: number;
    allThickness: ThicknessId[];
    allMarkerColors: ColorId[];
  };
  setPenColor: (newColor: { colorId: ColorId; color: string }) => void;
  setPenThickens: (penThickens: {
    thicknessId: ThicknessId;
    thickness: number;
  }) => void;
  setMarkerColor: (newColor: { colorId: ColorId; color: string }) => void;
  setMarkerThickness: (penThickens: {
    thicknessId: ThicknessId;
    thickness: number;
  }) => void;
};

export const useCurveStore = create<CurveSettings>()(
  immer((set) => ({
    penSettings: {
      color: "", // TODO probably can remove
      colorId: allPencilColors[0],
      thickness: 0,
      thicknessId: allPencilThickness[0],
      allThickness: allPencilThickness,
      allPencilColors: allPencilColors,
    },
    markerSettings: {
      color: "",
      colorId: allMarkerColors[0],
      opacity: 0.2,
      thickness: 0,
      thicknessId: allPencilThickness[0],
      allThickness: allPencilThickness,
      allMarkerColors: allMarkerColors,
    },
    setPenColor: (color) =>
      set((state) => {
        state.penSettings.colorId = color.colorId;
        state.penSettings.color = color.color;
      }),
    setPenThickens: (penThickens) =>
      set((state) => {
        state.penSettings.thickness = penThickens.thickness;
        state.penSettings.thicknessId = penThickens.thicknessId;
      }),
    setMarkerColor: (color) =>
      set((state) => {
        state.markerSettings.colorId = color.colorId;
        state.markerSettings.color = color.color;
      }),
    setMarkerThickness: (penThickens) =>
      set((state) => {
        state.markerSettings.thickness = penThickens.thickness;
        state.markerSettings.thicknessId = penThickens.thicknessId;
      }),
  }))
);
