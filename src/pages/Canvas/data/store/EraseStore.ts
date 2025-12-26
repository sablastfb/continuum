import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {Thickness, ThicknessId} from "../thicknesPalette/ThickneContainer";

export type EraseMethod = "strong" | "soft";
export interface EraseStore {
  eraseMethod: EraseMethod;
  thickness: Thickness;
  allEraseThickness: ThicknessId[];
  thicknessId: ThicknessId;
  softness: number;
  setEraseThickens: (penThickens: {
    thicknessId: ThicknessId;
    thickness: number;
  }) => void;
  setEraseMode: (eraseMode: EraseMethod) => void;
}

const allEraseThickness = ["th-1", "th-2", "th-3"];

export const useEraseStore = create<EraseStore>()(
  immer((set) => ({
    eraseMethod: "soft",
    thickness: 0,
    thicknessId: allEraseThickness[1],
    allEraseThickness: allEraseThickness,
    softness: 0.5,
    setEraseMode: (eraseMode) =>
      set((state) => {
        state.eraseMethod = eraseMode;
      }),
    setEraseThickens: (penThickens) =>
      set((state) => {
        state.thickness = penThickens.thickness;
        state.thicknessId = penThickens.thicknessId;
      }),
  }))
);
