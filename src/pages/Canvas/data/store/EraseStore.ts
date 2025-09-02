import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Thicknes, ThicknesId } from "../container/ThickneContainer";


// strong -> dlete whole connected graph
// soft -> part of graphic 
export type EraseMethod = 'strong' | 'soft';
export interface EraseStore{
    eraseMethod: EraseMethod;
    thicknes: Thicknes,
    allEraseThicknes:ThicknesId[],
    thicknesId: ThicknesId,
    softnes: number,
    setEraseThickens: (pencileThickens: {
        thicknesId: ThicknesId;
        thicknes: number;
      }) => void;
}

const allEraseThicknes = [ "th-1","th-2", "th-3"];

export const useEraseStore = create<EraseStore>()(
    immer((set)=> ({
        eraseMethod: 'soft',
        thicknes: 0,
        thicknesId: allEraseThicknes[1],
        allEraseThicknes: allEraseThicknes,
        softnes: 0.5,
        setEraseThickens: (pencileThickens) =>
            set((state) => {
              state.thicknes = pencileThickens.thicknes;
              state.thicknesId = pencileThickens.thicknesId;
            }),
    }))
);
