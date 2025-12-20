import { Continuum_Canvas } from "../CanvasApp";
import { InputBinding } from "./InputShortcuts.ts";

export const drawingBiding: InputBinding[] = [
  // DRAWING
  {
    pointerDown: true,
    mouseButtons: "LEFT",
    action: () => {
      Continuum_Canvas.toolManager.currentTool!.draw!();
    },
    appState: "DRAWING",
  },
  // STOP DRAWING
  {
    pointerDown: false,
    action: () => {
      Continuum_Canvas.toolManager.currentTool!.endDrawing!();
      Continuum_Canvas.inputStateManager.SwitchState("IDLE");
    },
    appState: "DRAWING",
  },
];
