import {Continuum_Canvas} from "../CanvasApp";
import {InputBinding} from "./InputStateManager.ts";

export const idleShortcuts: InputBinding[] = [
    {
        pointerDown: true,
        mouseButtons: "LEFT",
        action: () => {
            Continuum_Canvas.toolManager.currentTool!.startDrawing!();
            Continuum_Canvas.inputStateManager.SwitchState("DRAWING");
        },
        appState: 'IDLE'
    },
];
