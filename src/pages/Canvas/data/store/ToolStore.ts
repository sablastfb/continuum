import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { CurveToolType, SelectionToolType, ToolType } from "../types/ToolTypes";

export interface ToolStore {
  activeTool: ToolType;
  lastCureveTool: CurveToolType;
  lastSelectionTool: SelectionToolType;
  setActiveTool: (activeTool: ToolType) => void;
}

const useToolStore = create<ToolStore>()(
  immer((set) => ({
    activeTool: "pen",
    lastCureveTool: "pen",
    lastSelectionTool: "pan-zoom",
    setActiveTool: (activeTool) =>
      set((state) => {
        state.activeTool = activeTool;
      }),
  }))
);

export default useToolStore;
