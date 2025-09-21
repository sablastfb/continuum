import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Continuum_ToolManager } from "../../features/tools/ToolManager";

export interface CanvasStore {
  zoome: number;
  settingVisible: boolean;
  infoVisible: boolean;
  exportVisible: boolean;
  activeTool: Continuum_ToolManager.ToolType;
  canvasCursorActive: boolean;
  historyPosition: number;
  historyCount: number;
  setZoom: (zoom: number) => void;
  setCanvasCursorActive: (canvasCursorActive: boolean) => void;
  setSettingVisible: (visible: boolean) => void;
  setInfoVisible: (visible: boolean) => void;
  setExportVisible: (visible: boolean) => void;
  setActiveTool: (activeTool: Continuum_ToolManager.ToolType) => void;
  setHistoryPosition: (historyCount: number) => void;
  setHistoryCount: (historyPosition: number) => void;
}

const useCanvasStore = create<CanvasStore>()(
  immer((set) => ({
    zoome: 1,
    settingVisible: false,
    infoVisible: false,
    exportVisible: false,
    activeTool: "pencile",
    canvasCursorActive: true,
    historyPosition: -1,
    historyCount: 0,
    setHistoryCount: (historyCount) =>
      set((state) => {
        state.historyCount = historyCount;
      }),
    setHistoryPosition: (historyPosition) =>
      set((state) => {
        state.historyPosition = historyPosition;
      }),
    setZoom: (zoome) =>
      set((state) => {
        state.zoome = zoome;
      }),
    setSettingVisible: (settingVisible) =>
      set((state) => {
        state.settingVisible = settingVisible;
      }),
    setInfoVisible: (infoVisible) =>
      set((state) => {
        state.infoVisible = infoVisible;
      }),
    setExportVisible: (exportVisible) =>
      set((state) => {
        state.exportVisible = exportVisible;
      }),
    setActiveTool: (activeTool) =>
      set((state) => {
        state.activeTool = activeTool;
      }),
    setCanvasCursorActive: (canvasCursorActive) =>
      set((state) => {
        state.canvasCursorActive = canvasCursorActive;
      }),
  }))
);

export default useCanvasStore;
