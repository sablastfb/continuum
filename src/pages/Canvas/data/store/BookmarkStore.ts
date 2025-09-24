import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Bookmark = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  scale: number;
};
export interface BookmarkStore {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
}

export const useBookmark = create<BookmarkStore>()(
  immer((set) => ({
    bookmarks: [
      {
        id: "home",
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
    removeBookmark: (id) =>
      set((state) => {
        state.bookmarks.filter((x) => x.id === id);
      }),
  }))
);
