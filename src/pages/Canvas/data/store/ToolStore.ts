import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { CurveToolType, SelectionToolType, ToolType } from "../types/ToolTypes";

export interface ToolStore {
  activeTool: ToolType;
  lastCurveTool: CurveToolType;
  lastSelectionTool: SelectionToolType;
  setActiveTool: (activeTool: ToolType) => void;
  setLastCurveTool: (activeTool: CurveToolType) => void;
  setLastSelectionTool: (activeTool: SelectionToolType) => void;
}

const useToolStore = create<ToolStore>()(
  immer((set) => ({
    activeTool: "pen",
    lastCurveTool: "pen",
    lastSelectionTool: "pan-zoom",
    setActiveTool: (activeTool) =>
      set((state) => {
        state.activeTool = activeTool;
      }),
    setLastCurveTool: (activeTool) =>
      set((state) => {
        state.lastCurveTool = activeTool;
      }),
    setLastSelectionTool: (activeTool) =>
      set((state) => {
        state.lastSelectionTool = activeTool;
      }),
  }))
);

export default useToolStore;
