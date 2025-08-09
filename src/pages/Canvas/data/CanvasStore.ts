import { create } from "zustand";
import { ToolType } from "./CanvasTypes";
import { DefaultSettings } from "./SettingsConstants";
import { immer } from "zustand/middleware/immer";

export type BackgroundTypes = 'color' | 'grid' | 'dots';
export interface CanvasSettings {
  background: {
    type: BackgroundTypes;
    color: string;
    grid: {

    },
    dots: {

    }
  }
  pencile: {
    colors: string[],
    thicknes: number[]
  }
}


export interface CanvasStore {
  canvasSettings: CanvasSettings;
  color: string;
  zoome: number;
  settingVisible: boolean;
  infoVisible: boolean;
  exportVisible: boolean;
  activeTool: ToolType;
  pencileThickens: number;
  activeColorKey: number;
  canvasCursorActive: boolean;
  setZoom: (zoom: number) => void;
  setPencileColor: (newColor: {
    color: string;
    activeColorKey: number;
  }) => void;
  setSettingVisible: (visible: boolean) => void;
  setInfoVisible: (visible: boolean) => void;
  setExportVisible: (visible: boolean) => void;
  setActiveTool: (activeTool: ToolType) => void;
  setPencileThickens: (pencileThickens: number) => void;
  setCanvasCursorActive: (canvasCursorActive: boolean) => void;
  addColor: (color: string) => void;
}

const useCanvasStore = create<CanvasStore>()(
  immer((set) => ({
    canvasSettings: { ...DefaultSettings },
    color: "#1099bb",
    zoome: 1,
    settingVisible: false,
    infoVisible: false,
    exportVisible: false,
    activeTool: "drawing",
    pencileThickens: 5,
    activeColorKey: 0,
    canvasCursorActive: true,
    setZoom: (zoome) => set((state) => { state.zoome = zoome }),
    setPencileColor: (color) => 
      set((state) => {
        state.color = color.color;
        state.activeColorKey = color.activeColorKey;
      }),
    setSettingVisible: (settingVisible) => 
      set((state) => { state.settingVisible = settingVisible }),
    setInfoVisible: (infoVisible) => 
      set((state) => { state.infoVisible = infoVisible }),
    setExportVisible: (exportVisible) => 
      set((state) => { state.exportVisible = exportVisible }),
    setActiveTool: (activeTool) => 
      set((state) => { state.activeTool = activeTool }),
    setPencileThickens: (pencileThickens) => 
      set((state) => { state.pencileThickens = pencileThickens }),
    setCanvasCursorActive: (canvasCursorActive) => 
      set((state) => { state.canvasCursorActive = canvasCursorActive }),
    addColor: (color) =>
      set(state=> {state.canvasSettings.pencile.colors.push(color)})  
  }))
);


export const usePencileSettings = () => useCanvasStore((state) => state.canvasSettings.pencile);
export default useCanvasStore;
