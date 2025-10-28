import { Bookmark, useBookmark } from "../../data/store/BookmarkStore";
import { Continuum_Canvas } from "../CanvasApp";
import { CanvasViewport } from "./Viewport";
import { v4 as uuidv4 } from "uuid";

export namespace Continuum_Bookmark {
  let lastNumber = 0;
  export function addBookmark() {
    if (!Continuum_Canvas.viewportManager.viewport) return;
    const bookmakr: Bookmark = {
      name: `New Bookmark ${++lastNumber}`,
      id: uuidv4(),
      position: {
        x: Continuum_Canvas.viewportManager.viewport.center.x,
        y: Continuum_Canvas.viewportManager.viewport.center.y,
      },
      scale: Continuum_Canvas.viewportManager.viewport.scale.x,
    };
    useBookmark.getState().addBookmark(bookmakr);
  }

  export function moveToBookmarkHome() {
    const bookmark = useBookmark.getState().homeBookmakrs;
    if (bookmark) moveToBookmark(bookmark);
  }

  export function moveToBookmarkId(id: string) {
    const bookmark = useBookmark.getState().bookmarks.find((x) => x.id === id);
    if (bookmark) moveToBookmark(bookmark);
  }

  export function moveToBookmark(bookmark: Bookmark) {
    if (!Continuum_Canvas.viewportManager.viewport) return;
    Continuum_Canvas.viewportManager.viewport.animate({
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
    const updatedBookmark: Bookmark = { ...bookmark, name };
    useBookmark.getState().update(updatedBookmark);
  }
}
