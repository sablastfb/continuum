import { Scale } from "lucide-react";
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

  export function moveToBookmark(bookmark: Bookmark) {
    if (!Continuum_CanvasViewport.viewport) return;
    Continuum_CanvasViewport.viewport.animate({
      time: 500,
      position: bookmark.position,
      scale: bookmark.scale,
      ease: "easeInOutQuad",
    });
  }

  export function removeBookmark(bookmakr: Bookmark) {
    if (bookmakr.id === "home") return;
    useBookmark.getState().removeBookmark(bookmakr.id);
  }
}
