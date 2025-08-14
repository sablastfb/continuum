import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ColorId, DeepPartial, ThicknesId } from "../types/CanvasTypes";
import { DefaultSettings } from "../constants/DefaultSettings";
import { merge } from "lodash";
export type Theme = "dark" | "light";

export type BackgroundTypes = "color" | "grid" | "dots" | "line";

export type LayoutPositon = "top" | "bottom" | "left" | "right";

export type BackgroundSettings = {
  type: BackgroundTypes;
  color: ColorId;
  grid: {
    bacgroundColor: ColorId;
    gridColor: ColorId;
    size: number;
    width: number;
  };
  dots: {
    bacgroundColor: ColorId;
    dotColor: ColorId;
    radius: number;
    width: number;
  };
  line: {
    bacgroundColor: ColorId;
    lineColor: ColorId;
    width: number;
  };
  backgroundColors: ColorId[];
};

export interface SettingsData {
  layout: {
    toolButtons: LayoutPositon;
    toolMenue: LayoutPositon;
  };
  theme: Theme;
  background: BackgroundSettings;
  pencile: {
    colors: ColorId[];
    thicknes: ThicknesId[];
  };
}

export interface SettingsStore extends SettingsData {
  addColor: (color: ColorId) => void;
  discardSettings: (settings: SettingsData) => void;
  setBackgroundSettings: (
    bacgroundSettings: DeepPartial<BackgroundSettings>
  ) => void;
  reserToDefaultSettings: () => void;
  setLayoutToolsMenue: (positon: LayoutPositon) => void;
  setLayoutToolsButton: (positon: LayoutPositon) => void;
  setTheme: (theme: Theme) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  immer((set) => ({
    ...DefaultSettings,
    addColor: (color) =>
      set((state) => {
        state.pencile.colors.push(color);
      }),

    setBackgroundSettings: (settings) =>
      set((state) => {
        state.background = merge({}, state.background, settings);
      }),
    discardSettings: (settings) => {
      set((state) => {
        merge({}, state, settings);
      });
    },
    setTheme: (theme: Theme) => {
      set((state) => {
        state.theme = theme;
      });
    },
    setLayoutToolsMenue: (positon: LayoutPositon) => {
      set((state) => {
        state.layout.toolMenue = positon;
      });
    },
    setLayoutToolsButton: (positon: LayoutPositon) => {
      set((state) => {
        state.layout.toolButtons = positon;
      });
    },
    reserToDefaultSettings: () =>
      set((state) => {
        state = merge({}, state, DefaultSettings);
      }),
  }))
);

export default useSettingsStore;
