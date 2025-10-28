import { Continuum_Canvas } from "../CanvasApp";
import { Continuum_ToolManager } from "../tools/ToolManager";
import { InputBinding } from "./InputBiding";
import { MouseButton } from "./InputState";

export const idleBidings: InputBinding[] = [
  // DRAWING
  {
    pointerDown: true,
    action: (e) => {
      Continuum_Canvas.inputStateManager.SwitchState("DARWING");
        Continuum_ToolManager.currentTool!.startDrawing!(e);
    },
    appState: ["IDLE"],
  },
];
