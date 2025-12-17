import { Bookmark, useBookmark } from "../../data/store/BookmarkStore";
import { Continuum_Canvas } from "../CanvasApp";
import { v4 as uuidv4 } from "uuid";

export class BookmarkService {
  private lastNumber = 0;
  public addBookmark() {
    if (!Continuum_Canvas.viewportManager.viewport) return;
    const bookmark: Bookmark = {
      name: `New Bookmark ${++this.lastNumber}`,
      id: uuidv4(),
      position: {
        x: Continuum_Canvas.viewportManager.viewport.center.x,
        y: Continuum_Canvas.viewportManager.viewport.center.y,
      },
      scale: Continuum_Canvas.viewportManager.viewport.scale.x,
    };
    useBookmark.getState().addBookmark(bookmark);
  }

  public moveToBookmarkHome() {
    const bookmark = useBookmark.getState().homeBookmarks;
    if (bookmark) this.moveToBookmark(bookmark);
  }

  public moveToBookmarkId(id: string) {
    const bookmark = useBookmark.getState().bookmarks.find((x) => x.id === id);
    if (bookmark) this.moveToBookmark(bookmark);
  }

  public moveToBookmark(bookmark: Bookmark) {
    if (!Continuum_Canvas.viewportManager.viewport) return;
    Continuum_Canvas.viewportManager.viewport.animate({
      time: 500,
      position: bookmark.position,
      scale: bookmark.scale,
      ease: "easeInOutQuad",
    });
  }

  public removeBookmark(id: string | null) {
    if (!id) return;
    if (id === "home") return;
    useBookmark.getState().removeBookmark(id);
  }

  public renameBookmark(id: string, name: string) {
    const bookmark = useBookmark.getState().bookmarks.find((x) => x.id === id);
    if (!bookmark) return;
    const updatedBookmark: Bookmark = { ...bookmark, name };
    useBookmark.getState().update(updatedBookmark);
  }
}
