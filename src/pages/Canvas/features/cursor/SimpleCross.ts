import { ColorPalet } from "../../data/palet/PaletContainer";
import { ThicknesPalet } from "../../data/thicknes/ThickneContainer";
import useCanvasStore from "../../data/store/CanvasStore";
import { useEraseStore } from "../../data/store/EraseStore";
import { Continuum_Canvas } from "../CanvasApp";

export class SimpleCross {
  static draw() {
    const lineSize = 15;
    const lineDist = 4;
    Continuum_Canvas.cursorManager.cursor.clear();


    Continuum_Canvas.cursorManager.cursor
      .moveTo(lineDist, 0)
      .lineTo(lineSize, 0)
      .moveTo(-lineDist, 0)
      .lineTo(-lineSize, 0)
      .moveTo(0, lineDist)
      .lineTo(0, lineSize)
      .moveTo(0, -lineDist)
      .lineTo(0, -lineSize)
      .stroke({ width: 1, color: Continuum_Canvas.colorPalet.getColor("c-2") });
  }
}
