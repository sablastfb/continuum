import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Theme = "dark" | "light";
export type LayoutPositon = "top" | "bottom" | "left" | "right";
export type Direction = "vertical" | "horizontal";

export interface LayoutData {
  toolOptionsPosition: LayoutPositon;
  toolMenuePosition: LayoutPositon;
  toolOptionsDirection: Direction;
  toolMenuesDirection: Direction;
}

export const LayoutDefault: LayoutData = {
  toolOptionsPosition: "top",
  toolMenuePosition: "top",
  toolOptionsDirection: "horizontal",
  toolMenuesDirection: "horizontal",
};

export interface LayoutStore extends LayoutData {
  setLayoutOptions: (partialstate: Partial<LayoutStore>) => void;
}

export const useLayoutStore = create<LayoutStore>()(
  immer((set) => ({
    ...LayoutDefault,
    setLayoutOptions: (partialstate) =>
      set((state) => {
        state = { ...state, ...partialstate };
      }),
  }))
);

export default useLayoutStore;
