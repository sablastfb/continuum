import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { merge } from "lodash";
import { DeepPartial } from "../types/UtilTypes";
import { ColorId } from "../palet/PaletContainer";

export type BackgroundPatternType = "color" | "grid" | "dots" | "line";

export type SolidColorBackground = ColorId;
export type GridBackground = {
  sizeOfGrid: number;
  widthOfGridLine: number;
};
export type DotBackground = {
  dotRadius: number;
  tileWidth: number;
};
export type LineBackground = {
  spaceBetween: number;
};

export type BackgroundPatternSettings = {
  activeBackgroundType: BackgroundPatternType;
  fillColorId: ColorId;
  fillColors: ColorId[];
  grid: GridBackground;
  dots: DotBackground;
  line: LineBackground;
};

export type BackgroundData = BackgroundPatternSettings & {
  mainAxisVisible: boolean;
};

export interface BacgroundStore extends BackgroundData {
  discardSettings: (settings: BackgroundData) => void;
  setBackgroundSettings: (
    bacgroundSettings: DeepPartial<BackgroundData>
  ) => void;
  revertToDefaultSettings: () => void;
}

const backgroundColors = ["bg-1", "bg-2", "bg-3", "bg-5"];

export const BacgroundDefault: BackgroundData = {
  activeBackgroundType: "dots",
  fillColorId: backgroundColors[0],
  fillColors: backgroundColors,
  mainAxisVisible: false,
  grid: {
    sizeOfGrid: 50,
    widthOfGridLine: 1,
  },
  dots: {
    dotRadius: 2,
    tileWidth: 50,
  },
  line: {
    spaceBetween: 50,
  },
};

export const useBacgroundStore = create<BacgroundStore>()(
  immer((set) => ({
    ...BacgroundDefault,
    setBackgroundSettings: (settings) =>
      set((state) => {
        state = Object.assign(state, settings);
      }),
    discardSettings: (settings) => {
      set((state) => {
        merge(state, settings);
      });
    },
    revertToDefaultSettings: () =>
      set((state) => {
        merge(state, BacgroundDefault);
      }),
  }))
);

export default useBacgroundStore;
