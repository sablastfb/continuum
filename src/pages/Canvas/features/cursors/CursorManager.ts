import {FederatedPointerEvent, Graphics} from "pixi.js";
import {Cursor} from "./Cursor.ts";

export type ICursor = {
  updateCursor(): void;
}

export class CursorManager {
  public cursorGraphics: Graphics;
  public currentCursor: ICursor = new Cursor();

  constructor() {
    this.cursorGraphics = new Graphics();
  }

  public updateCursorGraphics() {
    if (this.currentCursor)
      this.currentCursor.updateCursor();
  }

  public updateCursorVisibility(visible: boolean) {
    if (this.cursorGraphics) {
      this.cursorGraphics.visible = visible;
    }
  }

  public updateCursorPosition(e: FederatedPointerEvent) {
    this.cursorGraphics.position.set(e.globalX, e.globalY);
  }
}
