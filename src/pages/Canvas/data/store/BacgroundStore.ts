import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { merge } from "lodash";
import { DeepPartial } from "../types/UtilTypes";
import { TileBacgroundSettings } from "../../features/service/TailBackground";

export type Theme = "dark" | "light";
export type LayoutPositon = "top" | "bottom" | "left" | "right";

export interface BacgroundData {
  layout: {
    toolButtons: LayoutPositon;
    toolMenue: LayoutPositon;
  };
  theme: Theme;
  background: TileBacgroundSettings;
}

export interface BacgroundStore extends BacgroundData {
  discardSettings: (settings: BacgroundData) => void;
  setBackgroundSettings: (
    bacgroundSettings: DeepPartial<TileBacgroundSettings>
  ) => void;
  reserToDefaultSettings: () => void;
  setLayoutToolsMenue: (positon: LayoutPositon) => void;
  setLayoutToolsButton: (positon: LayoutPositon) => void;
  setTheme: (theme: Theme) => void;
}

const backgroundColors = ["bg-3", "bg-2", "bg-3", "bg-5"];

export const BacgroundDefault: BacgroundData = {
  background: {
    activeBacgroundType: "color",
    color: backgroundColors[0],
    grid: {
      bacgroundColor: backgroundColors[0],
      gridBorderColor: "bgt-1",
      sizeOfGrid: 50,
      widthOfGridLine: 1,
    },
    dots: {
      bacgroundColor: backgroundColors[0],
      dotColor: "bgt-1",
      dotRadius: 2,
      tileWidth: 50,
    },
    line: {
      bacgroundColor: backgroundColors[0],
      lineColor: "bgt-1",
      spaceBetween: 50,
    },
    backgroundColors: backgroundColors,
  },
  theme: "dark",
  layout: {
    toolButtons: "right",
    toolMenue: "top",
  },
};

export const useSettingsStore = create<BacgroundStore>()(
  immer((set) => ({
    ...BacgroundDefault,
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
        merge(state, BacgroundDefault);
      }),
  }))
);

export default useSettingsStore;
