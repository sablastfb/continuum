import { create } from "zustand";
import { CanvasStore } from "./CanvasTypes";
import { DefaultSettings } from "./SettingsConstants";
import { immer } from "zustand/middleware/immer";
import { merge } from "lodash";

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
  }))
);

export default useCanvasStore;
