import { Continuum_Canvas } from "../CanvasApp";
import { Continuum_ToolManager } from "../tools/ToolManager";
import { InputBinding } from "./InputBiding";
import { MouseButton } from "./InputState";

export const drawingBidings: InputBinding[] = [
  // DRAWING
  {
    pointerDown: true,
    action: (e) => {
        Continuum_ToolManager.currentTool!.draw!(e);
    },
    appState: ["DARWING"],
  },
  // STOP DRAWING
  {
    pointerDown: false,
    action: (e) => {
      Continuum_ToolManager.currentTool!.stopDrawing!(e);
      Continuum_Canvas.inputStateManager.SwitchState("IDLE");
    },
    appState: ["DARWING"],
  },
];
