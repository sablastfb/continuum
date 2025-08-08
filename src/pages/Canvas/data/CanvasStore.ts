import { create } from "zustand";
import { ToolType } from "./CanvasTypes";

export interface CanvasStore {
  color: string;
  zoome: number;
  settingVisible: boolean;
  infoVisible: boolean;
  exportVisible: boolean;
  activeTool: ToolType;
  pencileThickens: number;
  activeColorKey: number;
  setZoom: (zoom: number) => void;
  setPencileColor: (newColor: {color: string, activeColorKey: number}) => void;
  setSettingVisible: (visible: boolean) => void;
  setInfoVisible: (visible: boolean) => void;
  setExportVisible: (visible: boolean) => void;
  setActiveTool: (activeTool: ToolType) => void;
  setPencileThickens: (pencileThickens: number) => void;
}

const useCanvasStore = create<CanvasStore>((set) => ({
  color: "#1099bb",
  zoome: 1,
  settingVisible: false,
  infoVisible: false,
  exportVisible: false,
  activeTool: "drawing",
  pencileThickens: 5,
  activeColorKey: 0,
  setZoom: (zoome) => set({ zoome }),
  setPencileColor: (color) => set({ color: color.color, activeColorKey: color.activeColorKey }),
  setSettingVisible: (settingVisible) => set({ settingVisible }),
  setInfoVisible: (infoVisible) => set({ infoVisible }),
  setExportVisible: (exportVisible) => set({ exportVisible }),
  setActiveTool: (activeTool) => set({ activeTool }),
  setPencileThickens: (pencileThickens: number) => set({ pencileThickens }),
}));

export default useCanvasStore;
