import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Thicknes, ThicknesId } from "../thicknes/ThickneContainer";

export type EraseMethod = "strong" | "soft";
export interface EraseStore {
  eraseMethod: EraseMethod;
  thicknes: Thicknes;
  allEraseThicknes: ThicknesId[];
  thicknesId: ThicknesId;
  softnes: number;
  setEraseThickens: (penThickens: {
    thicknesId: ThicknesId;
    thicknes: number;
  }) => void;
  setEraseMode: (eraseMode: EraseMethod) => void;
}

const allEraseThicknes = ["th-1", "th-2", "th-3"];

export const useEraseStore = create<EraseStore>()(
  immer((set) => ({
    eraseMethod: "soft",
    thicknes: 0,
    thicknesId: allEraseThicknes[1],
    allEraseThicknes: allEraseThicknes,
    softnes: 0.5,
    setEraseMode: (eraseMode) =>
      set((state) => {
        state.eraseMethod = eraseMode;
      }),
    setEraseThickens: (penThickens) =>
      set((state) => {
        state.thicknes = penThickens.thicknes;
        state.thicknesId = penThickens.thicknesId;
      }),
  }))
);
