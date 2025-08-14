import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { merge } from "lodash";
import { CanvasStore, LayoutPositon } from "../types/CanvasTypes";
import { DefaultSettings } from "../constants/SettingsConstants";
import { Theme } from "@tauri-apps/api/window";

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
    setLayoutToolsMenue: (positon: LayoutPositon) => {
      set((state) => {
        state.canvasSettings.layout.toolMenue = positon
      })
    },
    setLayoutToolsButton: (positon: LayoutPositon) => {
      set((state) => {
        state.canvasSettings.layout.toolButtons = positon
      })
    }
  }))
);

export default useCanvasStore;
