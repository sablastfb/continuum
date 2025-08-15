import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { DefaultSettings } from "../constants/DefaultSettings";
import { ToolType } from "../../features/tools/ToolManager";

export interface CanvasStore {
  zoome: number;
  settingVisible: boolean;
  infoVisible: boolean;
  exportVisible: boolean;
  activeTool: ToolType;
  canvasCursorActive: boolean;
  setZoom: (zoom: number) => void;
  setCanvasCursorActive: (canvasCursorActive: boolean) => void;
  setSettingVisible: (visible: boolean) => void;
  setInfoVisible: (visible: boolean) => void;
  setExportVisible: (visible: boolean) => void;
  setActiveTool: (activeTool: ToolType) => void;
}

const useCanvasStore = create<CanvasStore>()(
  immer((set) => ({
    canvasSettings: { ...DefaultSettings },
    zoome: 1,
    settingVisible: false,
    infoVisible: false,
    exportVisible: false,
    activeTool: "drawing",
    canvasCursorActive: true,
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
