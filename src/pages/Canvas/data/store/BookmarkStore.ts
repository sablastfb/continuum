import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Bookmark = {
  id: string;
  name: string;
  position: {
    x: number;
    y: number;
  };
  scale: number;
};
export interface BookmarkStore {
  containerVisible: boolean;
  homeBookmakrs: Bookmark;
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  update: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
  setContainerVisible: (containerVisible: boolean) => void;
}

export const useBookmark = create<BookmarkStore>()(
  immer((set) => ({
    containerVisible: false,
    homeBookmakrs: {
      id: "home",
      name: "home",
      position: {
        x: 0,
        y: 0,
      },
      scale: 1,
    },
    bookmarks: [],
    addBookmark: (bookmark) =>
      set((state) => {
        state.bookmarks.push(bookmark);
      }),
    update: (bookmakr) =>
      set((state) => {
        const id = state.bookmarks.findIndex((obj) => obj.id === bookmakr.id);
        state.bookmarks[id] = bookmakr;
      }),
    removeBookmark: (id) =>
      set((state) => {
        if (id === "home") return;
        state.bookmarks = state.bookmarks.filter((x) => x.id !== id);
      }),
    setContainerVisible: (containerVisible: boolean) =>
      set((state) => {
        state.containerVisible = containerVisible;
      }),
  }))
);
