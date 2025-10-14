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
  toolMenuePosition: "top",
  toolMenuesDirection: "horizontal",

  toolOptionsPosition: "bottom",
  toolOptionsDirection: "horizontal",
};

export interface LayoutStore extends LayoutData {
  setLayoutOptions: (partialstate: Partial<LayoutStore>) => void;
}

export const useLayoutStore = create<LayoutStore>()(
  immer((set) => ({
    ...LayoutDefault,
    setLayoutOptions: (partialState) =>
      set((state) => {
        Object.assign(state, partialState);
        
        // Auto-correct directions based on positions
        if (partialState.toolMenuePosition !== undefined) {
          state.toolMenuesDirection = (partialState.toolMenuePosition === 'left' || partialState.toolMenuePosition === 'right') 
            ? 'vertical' 
            : 'horizontal';
        }
        
        if (partialState.toolOptionsPosition !== undefined) {
          state.toolOptionsDirection = (partialState.toolOptionsPosition === 'left' || partialState.toolOptionsPosition === 'right') 
            ? 'vertical' 
            : 'horizontal';
        }
      }),
  }))
);
export default useLayoutStore;
