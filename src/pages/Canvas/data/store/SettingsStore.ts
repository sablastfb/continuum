import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { merge } from "lodash";
import { ColorId } from "../container/PaletContainer";
import { DeepPartial } from "../types/UtilTypes";

export type Theme = "dark" | "light";
export type BackgroundTypes = "color" | "grid" | "dots" | "line";
export type LayoutPositon = "top" | "bottom" | "left" | "right";

export type BackgroundSettings = {
  activeBacgroundType: BackgroundTypes;
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
}

export interface SettingsStore extends SettingsData {
  discardSettings: (settings: SettingsData) => void;
  setBackgroundSettings: (
    bacgroundSettings: DeepPartial<BackgroundSettings>
  ) => void;
  reserToDefaultSettings: () => void;
  setLayoutToolsMenue: (positon: LayoutPositon) => void;
  setLayoutToolsButton: (positon: LayoutPositon) => void;
  setTheme: (theme: Theme) => void;
}

const backgroundColors = ["bg-1", "bg-2", "bg-3", "bg-5"];

export const DefaultSettings: SettingsData = {
  background: {
    activeBacgroundType: "color",
    color: backgroundColors[0],
    grid: {
      bacgroundColor: backgroundColors[3],
      gridColor: "bgt-1",
      size: 5,
      width: 10,
    },
    dots: {
      bacgroundColor: backgroundColors[0],
      dotColor: "bgt-1",
      radius: 1.5,
      width: 25,
    },
    line: {
      bacgroundColor: backgroundColors[0],
      lineColor: "bgt-1",
      width: 25,
    },
    backgroundColors: backgroundColors,
  },
  theme: "dark",
  layout: {
    toolButtons: "right",
    toolMenue: "top",
  },
};

export const useSettingsStore = create<SettingsStore>()(
  immer((set) => ({
    ...DefaultSettings,
    setBackgroundSettings: (settings) =>
      set((state) => {
       state.background = merge({},state.background, settings);
      }),
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
    discardSettings: (settings) => {
      set((state) => {
        merge(state, settings);
      });
    },
    reserToDefaultSettings: () =>
      set((state) => {
        merge(state, DefaultSettings);
      }),
  }))
);

export default useSettingsStore;
