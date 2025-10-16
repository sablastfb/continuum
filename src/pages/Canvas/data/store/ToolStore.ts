import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ToolType } from "../types/ToolTypes";

export interface ToolStore {
  activeTool: ToolType;
    setActiveTool: (activeTool: ToolType) => void;
}

const useToolStore = create<ToolStore>()(
  immer((set) => ({
    activeTool: "pen",
    setActiveTool: (activeTool) =>
      set((state) => {
        state.activeTool = activeTool;
      }),
  }))
);

export default useToolStore;
