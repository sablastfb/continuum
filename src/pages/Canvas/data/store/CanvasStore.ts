import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface CanvasStore {
  zoome: number;
  settingVisible: boolean;
  infoVisible: boolean;
  exportVisible: boolean;
  canvasCursorActive: boolean;
  historyPosition: number;
  historyCount: number;
  qucikToolsActive: boolean;
  advanceToolsActive: boolean;
  setZoom: (zoom: number) => void;
  setCanvasCursorActive: (canvasCursorActive: boolean) => void;
  setSettingVisible: (visible: boolean) => void;
  setInfoVisible: (visible: boolean) => void;
  setExportVisible: (visible: boolean) => void;
  setHistoryPosition: (historyCount: number) => void;
  setHistoryCount: (historyPosition: number) => void;
  setAdvanceToolsVisibility: (advanceTools: boolean) => void;
  setQuickToolsVisibility: (advanceTools: boolean) => void;
}

const useCanvasStore = create<CanvasStore>()(
  immer((set) => ({
    zoome: 1,
    settingVisible: false,
    infoVisible: false,
    exportVisible: false,
    canvasCursorActive: true,
    historyPosition: -1,
    historyCount: 0,
    advanceToolsActive: false,
    qucikToolsActive: true,
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

    setCanvasCursorActive: (canvasCursorActive) =>
      set((state) => {
        state.canvasCursorActive = canvasCursorActive;
      }),
    setAdvanceToolsVisibility: (advanceTools: boolean) =>
      set((state) => {
        state.advanceToolsActive = advanceTools;
      }),
    setQuickToolsVisibility: (advanceTools: boolean) =>
      set((state) => {
        state.qucikToolsActive = advanceTools;
      }),
  }))
);

export default useCanvasStore;
