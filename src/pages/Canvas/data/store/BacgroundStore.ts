import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { merge } from "lodash";
import { DeepPartial } from "../types/UtilTypes";
import { TileBacgroundSettings } from "../../features/service/TailBackground";

export type Theme = "dark" | "light";
export type LayoutPositon = "top" | "bottom" | "left" | "right";

export interface BacgroundData {
  theme: Theme;
  background: TileBacgroundSettings;
}

export interface BacgroundStore extends BacgroundData {
  discardSettings: (settings: BacgroundData) => void;
  setBackgroundSettings: (
    bacgroundSettings: DeepPartial<TileBacgroundSettings>
  ) => void;
  reserToDefaultSettings: () => void;
  setTheme: (theme: Theme) => void;
}

const backgroundColors = ["bg-1", "bg-2", "bg-3", "bg-5"];

export const BacgroundDefault: BacgroundData = {
  background: {
    activeBacgroundType: "dots",
    color: backgroundColors[0],
    backgroundColors: backgroundColors,
    grid: {
      gridBorderColor: "bgt-1",
      sizeOfGrid: 50,
      widthOfGridLine: 1,
    },
    dots: {
      dotColor: "bgt-1",
      dotRadius: 2,
      tileWidth: 50,
    },
    line: {
      lineColor: "bgt-1",
      spaceBetween: 50,
    },
  },
  theme: "dark",
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
