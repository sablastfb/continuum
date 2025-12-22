import { Continuum_Canvas } from "../CanvasApp";
import {InputBinding} from "./InputStateManager.ts";

export const voidShortcuts: InputBinding[] = [
    // DRAWING
    {
        keys: [],
        pointerDown: false,
        action: () => {
            Continuum_Canvas.inputStateManager.SwitchState("IDLE");
        },
        appState: "VOID",
    },
];
