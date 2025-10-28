import { Continuum_Canvas } from "../CanvasApp";
import { InputBinding } from "./InputBiding";

export const drawingBidings: InputBinding[] = [
  // DRAWING
  {
    pointerDown: true,
    action: (e) => {
      Continuum_Canvas.toolManager.currentTool!.draw!(e);
    },
    appState: ["DARWING"],
  },
  // STOP DRAWING
  {
    pointerDown: false,
    action: (e) => {
      Continuum_Canvas.toolManager.currentTool!.stopDrawing!(e);
      Continuum_Canvas.inputStateManager.SwitchState("IDLE");
    },
    appState: ["DARWING"],
  },
];
