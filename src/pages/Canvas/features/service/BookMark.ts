import { Scale } from "lucide-react";
import { Bookmark, useBookmark } from "../../data/store/BookmarkStore";
import { Continuum_CanvasViewport } from "./Viewport";
import { v4 as uuidv4 } from "uuid";

export namespace Continuum_Bookmark {
  export function moveToLast() {
    const bookmakrs = useBookmark.getState().bookmarks;

    moveToBookmark(bookmakrs[bookmakrs.length - 1]);
  }

  export function addBookmark() {
    if (!Continuum_CanvasViewport.viewport) return;
    const bookmakr: Bookmark = {
      id: uuidv4(),
      position: {
        x: Continuum_CanvasViewport.viewport.center.x,
        y: Continuum_CanvasViewport.viewport.center.y,
      },
      scale: Continuum_CanvasViewport.viewport.scale.x,
    };
    useBookmark.getState().addBookmark(bookmakr);
  }

  export function moveHome() {
    const bookmakrs = useBookmark.getState().bookmarks;
    const homeBookmark = bookmakrs.find((x) => x.id === "home");
    if (homeBookmark) {
      moveToBookmark(homeBookmark);
    }
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
}
