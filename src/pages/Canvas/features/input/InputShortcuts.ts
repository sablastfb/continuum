import {drawingBiding} from "./DrawingState";
import {idleShortcuts} from "./IdleState";
import {KeyboardKey, MouseButton, useKeyStore} from "../../data/store/KeyStore.ts";
import {InputUtils} from "./InputUtils.ts";

export type AppCanvasState = "IDLE" | "DRAWING" | "VOID_KEY_PUSHED";

export type InputBinding = {
    keys?: KeyboardKey[];
    pointerDown?: boolean,
    mouseButtons?: MouseButton;
    appState: AppCanvasState;
    action: () => void;
};

export class InputBindings {
    private shortcuts: InputBinding[] = [
        ...idleShortcuts,
        ...drawingBiding,
    ];

    private activeAction: (() => void) | null = null;

    public subscribeShortcuts() {
        useKeyStore.subscribe(() => {
            this.activeAction = null;
            const appState = useKeyStore.getState().currentAppCanvasState;
            const mouseButtons = useKeyStore.getState().mouseButtons;
            const pointerDown = useKeyStore.getState().pointerDown;
            const keysDown = useKeyStore.getState().keyDown;
            for (const shortcut of this.shortcuts) {
                if (shortcut.appState !== appState) continue;
                if (pointerDown !== undefined && shortcut.pointerDown !== pointerDown) continue;
                if (shortcut.mouseButtons !== undefined && !InputUtils.hasMouseButton(mouseButtons, shortcut.mouseButtons)) continue;
                if (shortcut.keys && !InputUtils.containKey(shortcut.keys, keysDown))continue;

                this.activeAction = shortcut.action;
                break;
            }
        })
    }

    public runAction(){
        if (this.activeAction !== null )
            this.activeAction();
    }


}
