import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { CurveToolType, SelectionToolType, ToolType } from "../types/ToolTypes";

export interface ToolStore {
  activeTool: ToolType;
  lastCureveTool: CurveToolType;
  lastSelectionTool: SelectionToolType;
  setActiveTool: (activeTool: ToolType) => void;
  setLastCureveTool: (activeTool: CurveToolType) => void;
  setLastSelectionTool: (activeTool: SelectionToolType) => void;
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
    setLastCureveTool: (activeTool) =>
      set((state) => {
        state.lastCureveTool = activeTool;
      }),
    setLastSelectionTool: (activeTool) =>
      set((state) => {
        state.lastSelectionTool = activeTool;
      }),
  }))
);

export default useToolStore;
