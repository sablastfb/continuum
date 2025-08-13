import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { merge } from "lodash";
import { CanvasStore } from "../types/CanvasTypes";
import { DefaultSettings } from "../constants/SettingsConstants";
import { Theme } from "@tauri-apps/api/window";

const useCanvasStore = create<CanvasStore>()(
  immer((set) => ({
    canvasSettings: { ...DefaultSettings },
    pencil: {
      pencilColorId: DefaultSettings.pencile.colors[0],
      pencilColor: "",
      thicknesId: DefaultSettings.pencile.thicknes[0],
      thicknes: 0,
    },
    zoome: 1,
    settingVisible: false,
    infoVisible: false,
    exportVisible: false,
    activeTool: "drawing",
    pencileThickens: 5,
    canvasCursorActive: true,
    setZoom: (zoome) =>
      set((state) => {
        state.zoome = zoome;
      }),
    setPencileColor: (color) =>
      set((state) => {
        debugger;
        state.pencil.pencilColorId = color.colorId;
        state.pencil.pencilColor = color.color;
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
        state.pencil.thicknes = pencileThickens.thicknes;
        state.pencil.thicknesId = pencileThickens.thicknesId;
      }),
    setBackgroundSettings: (settings) =>
      set((state) => ({
        canvasSettings: {
          ...state.canvasSettings,
          background: merge({}, state.canvasSettings.background, settings),
        },
      })),
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
    setTheme: (theme: Theme) => {
      set((state) => {
        state.canvasSettings.theme = theme;
      });
    },
  }))
);

export default useCanvasStore;
