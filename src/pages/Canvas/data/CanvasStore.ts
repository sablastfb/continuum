import { create } from "zustand";
import { CanvasStore } from "./CanvasTypes";
import { DefaultSettings } from "./SettingsConstants";
import { immer } from "zustand/middleware/immer";


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
    setBackgroundType: (type) => set((state) => {
      state.canvasSettings.background.type = type
    }),
    discardSettings: (settings) => {
      set((state) => {
        state.canvasSettings = settings;
      });
    },
    setBackgroundDotsColor: (color) => {
      set((state) => {
        state.canvasSettings.background.dots.bacgroundColor = color;
      });
    },
    setBackgroundLineColor: (color) => {
      set((state) => {
        state.canvasSettings.background.line.bacgroundColor = color;
      });

    },
    setBackgroundGridColor: (color) => {
       set((state) => {
        state.canvasSettings.background.grid.bacgroundColor = color;
      });
    },
  }))
);

export default useCanvasStore;
