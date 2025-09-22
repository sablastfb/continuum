import { create } from "zustand";
import { immer } from "zustand/middleware/immer";


export interface ShapeData {}

export const DefaultShapeSettings: ShapeData = {};
export interface ShapeStore extends ShapeData {}

export const useShapeStore = create<ShapeStore>()(
  immer((set) => ({
    ...DefaultShapeSettings,
  }))
);
