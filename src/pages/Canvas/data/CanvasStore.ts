import { create } from "zustand";
import { ToolType } from "./CanvasTypes";
import { DefaultSettings } from "./SettingsConstants";
import { immer } from "zustand/middleware/immer";

export type BackgroundTypes = "color" | "grid" | "dots";
export interface CanvasSettings {
  background: {
    type: BackgroundTypes;
    color: string;
    grid: {};
    dots: {};
  };
  pencile: {
    colors: string[];
    thicknes: number[];
  };
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
  setBackgroundColor: (color: string) => void;
  discardSettings: (settings: CanvasSettings) => void;
  reserToDefaultSettings: () => void;
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
    setZoom: (zoome) =>
      set((state) => {
        state.zoome = zoome;
      }),
    setPencileColor: (color) =>
      set((state) => {
        state.color = color.color;
        state.activeColorKey = color.activeColorKey;
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
    setPencileThickens: (pencileThickens) =>
      set((state) => {
        state.pencileThickens = pencileThickens;
      }),
    setBackgroundColor: (color) =>
      set((state) => {
        state.canvasSettings.background.color = color;
      }),
    setCanvasCursorActive: (canvasCursorActive) =>
      set((state) => {
        state.canvasCursorActive = canvasCursorActive;
      }),
    addColor: (color) =>
      set((state) => {
        state.canvasSettings.pencile.colors.push(color);
      }),
    reserToDefaultSettings: () =>
      set((state) => {
        state.canvasSettings = { ...DefaultSettings };
      }),
    discardSettings: (settings) => {
      set((state) => {
        state.canvasSettings = settings;
      });
    },
  }))
);

export default useCanvasStore;
