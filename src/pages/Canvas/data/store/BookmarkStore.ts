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
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  update: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
}

export const useBookmark = create<BookmarkStore>()(
  immer((set) => ({
    bookmarks: [
      {
        id: "home",
        name: "home",
        position: {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        },
        scale: 1,
      },
    ],
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
  }))
);
