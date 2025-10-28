import { Continuum_Canvas } from "../CanvasApp";
import { InputBinding } from "./InputBiding";
import { PointerType } from "./InputState";

export const idleBidings: InputBinding[] = [
  // DRAWING
  {
    pointerDown: true,
    action: (e) => {
      if (e.pointerType === PointerType.MOUSE) {
        if (e.mouseButtons & 1) {
          Continuum_Canvas.inputStateManager.SwitchState("DARWING");
          Continuum_Canvas.toolManager.currentTool!.startDrawing!(e);
        }
      }
    },
    appState: ["IDLE"],
  },
];
