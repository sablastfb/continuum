import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type LayoutPositon = "top" | "bottom" | "left" | "right";
export type Direction = "vertical" | "horizontal";

export interface LayoutData {
  toolOptionsPosition: LayoutPositon;
  toolMenuPosition: LayoutPositon;
  toolOptionsDirection: Direction;
  toolMenuDirection: Direction;
}

export const LayoutDefault: LayoutData = {
  toolMenuPosition: "top",
  toolMenuDirection: "horizontal",

  toolOptionsPosition: "top",
  toolOptionsDirection: "horizontal",
};

export interface LayoutStore extends LayoutData {
  setLayoutOptions: (partialState: Partial<LayoutStore>) => void;
}

export const useLayoutStore = create<LayoutStore>()(
  immer((set) => ({
    ...LayoutDefault,
    setLayoutOptions: (partialState) =>
      set((state) => {
        Object.assign(state, partialState);
        
        if (partialState.toolMenuPosition !== undefined) {
          state.toolMenuDirection = (partialState.toolMenuPosition === 'left' || partialState.toolMenuPosition === 'right')
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
