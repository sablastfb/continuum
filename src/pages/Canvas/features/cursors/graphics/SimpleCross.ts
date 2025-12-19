import { Continuum_Canvas } from "../../CanvasApp.ts";

export class SimpleCross {
  static draw() {
    const lineSize = 15;
    const lineDist = 4;
    Continuum_Canvas.cursorManager.cursorGraphics.clear();


    Continuum_Canvas.cursorManager.cursorGraphics
      .moveTo(lineDist, 0)
      .lineTo(lineSize, 0)
      .moveTo(-lineDist, 0)
      .lineTo(-lineSize, 0)
      .moveTo(0, lineDist)
      .lineTo(0, lineSize)
      .moveTo(0, -lineDist)
      .lineTo(0, -lineSize)
      .stroke({ width: 1, color: Continuum_Canvas.colorPalette.getColor("c-2") });
  }
}
