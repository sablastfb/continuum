import { Continuum_Canvas } from "../CanvasApp";
import { Continuum_CanvasCursor } from "../cursor/CursorManager";
import { Continuum_ToolManager } from "../tools/ToolManager";
import { InputBinding } from "./InputBiding";
import { MouseButton } from "./InputState";

export const dewaultBidings: InputBinding[] = [
  // DRAWING
  {
    action: (e) => {
        Continuum_CanvasCursor.moveCursor(e);
    },
    appState: [],
  },

];
