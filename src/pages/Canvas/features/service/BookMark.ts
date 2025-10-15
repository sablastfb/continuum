import { Bookmark, useBookmark } from "../../data/store/BookmarkStore";
import { Continuum_CanvasViewport } from "./Viewport";
import { v4 as uuidv4 } from "uuid";

export namespace Continuum_Bookmark {
  let lastNumber = 0;
  export function addBookmark() {
    if (!Continuum_CanvasViewport.viewport) return;
    const bookmakr: Bookmark = {
      name: `New Bookmark ${++lastNumber}`,
      id: uuidv4(),
      position: {
        x: Continuum_CanvasViewport.viewport.center.x,
        y: Continuum_CanvasViewport.viewport.center.y,
      },
      scale: Continuum_CanvasViewport.viewport.scale.x,
    };
    useBookmark.getState().addBookmark(bookmakr);
  }

  export function moveToBookmarkHome() {
    const bookmark = useBookmark.getState().homeBookmakrs
    if (bookmark) moveToBookmark(bookmark);
  }

  export function moveToBookmarkId(id: string) {
    const bookmark = useBookmark.getState().bookmarks.find((x) => x.id === id);
    if (bookmark) moveToBookmark(bookmark);
  }

  export function moveToBookmark(bookmark: Bookmark) {
    if (!Continuum_CanvasViewport.viewport) return;
    Continuum_CanvasViewport.viewport.animate({
      time: 500,
      position: bookmark.position,
      scale: bookmark.scale,
      ease: "easeInOutQuad",
    });
  }

  export function removeBookmark(id: string | null) {
    if (!id) return;
    if (id === "home") return;
    useBookmark.getState().removeBookmark(id);
  }

  export function renameBookmark(id: string, name: string) {
    const bookmark = useBookmark.getState().bookmarks.find((x) => x.id === id);
    if (!bookmark) return;
    const updatedBookmark: Bookmark = { ...bookmark, name};
    useBookmark.getState().update(updatedBookmark);
  }
}
