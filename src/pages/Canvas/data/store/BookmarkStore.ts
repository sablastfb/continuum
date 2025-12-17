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
  homeBookmarks: Bookmark;
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  update: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
  setContainerVisible: (containerVisible: boolean) => void;
}

export const useBookmark = create<BookmarkStore>()(
  immer((set) => ({
    containerVisible: false,
    homeBookmarks: {
      id: "home",
      name: "home",
      position: {
        x: 0,
        y: +32,
      },
      scale: 1,
    },
    bookmarks: [],
    addBookmark: (bookmark) =>
      set((state) => {
        state.bookmarks.push(bookmark);
      }),
    update: (bookmark) =>
      set((state) => {
        const id = state.bookmarks.findIndex((obj) => obj.id === bookmark.id);
        state.bookmarks[id] = bookmark;
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
