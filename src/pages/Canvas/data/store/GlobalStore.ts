import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Theme = "dark" | "light";

export interface GlobalStoreData {
  theme: Theme;
}

export interface GlobalStore extends GlobalStoreData {
  setTheme: (theme: Theme) => void;
}

export const globalStoreData: GlobalStoreData = {
  theme: "dark",
};

export const useGlobalStore = create<GlobalStore>()(
  immer((set) => ({
    ...globalStoreData,
    setTheme: (theme: Theme) => {
      set((state) => {
        state.theme = theme;
      });
    },
  }))
);

export default useGlobalStore;
