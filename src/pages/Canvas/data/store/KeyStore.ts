import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {enableMapSet} from "immer";
import {AppCanvasState} from "../../features/input/InputShortcuts.ts";
import {InputUtils} from "../../features/input/InputUtils.ts";

enableMapSet();

export type MouseButton = "RIGHT" | "LEFT" | "MIDDLE";
// Letters
export type Letter =
    | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm'
    | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
    | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M'
    | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

// Numbers
export type NumberKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

// Modifiers
export type ModifierKey = 'Control' | 'Shift' | 'Alt' | 'CapsLock';

// Special keys
export type SpecialKey =
    | 'Enter' | 'Escape' | 'Backspace' | 'Tab' | 'Space' | ' '
    | 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'
    | 'Delete' | 'Home' | 'End' | 'PageUp' | 'PageDown';

// Function keys
export type FunctionKey =
    | 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12';

// All keyboard keys
export type KeyboardKey = Letter | NumberKey | ModifierKey | SpecialKey | FunctionKey;

export interface KeyState {
    currentAppCanvasState: AppCanvasState;
    keyDown: KeyboardKey[];
    mouseButtons: number;
    pointerDown: boolean;
    setKeyDown: (key: string, pressed: boolean) => void;
}


export const useKeyStore = create<KeyState>()(
    immer((set) => ({
        currentAppCanvasState: "IDLE",
        pointerDown: false,
        keyDown: [],
        mouseButtons: 0,
        setKeyDown: (key: string, pressed: boolean) =>
            set((state) => {
                const normalizedKey = InputUtils.normalizeKey(key);
                if (pressed) {
                    state.keyDown.push(normalizedKey);
                } else {
                    state = state.keyDown.filter(x=>x!==normalizedKey);
                }
            }),
    }))
);