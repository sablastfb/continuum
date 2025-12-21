import {FederatedPointerEvent} from "pixi.js";
import {Continuum_Canvas} from "../CanvasApp";
import useCanvasStore from "../../data/store/CanvasStore";
import {PointerType, useInputStore} from "../../data/store/InputStore.ts";
import {useKeyStore} from "../../data/store/KeyStore.ts";
import {AppCanvasState} from "./InputShortcuts.ts";
import {throttle, DebouncedFunc } from "lodash";

export class InputStateManager {
    private rect: { left: number; top: number } | null = null;
    private updateInputThrottled: DebouncedFunc <(e: FederatedPointerEvent) => void>;

    constructor() {
        this.updateInputThrottled = throttle(
            this.updateInputStoreFunction.bind(this),
            16
        );
    }

    public subscribeEvents() {
        window.addEventListener("keydown", (e) => {
            useKeyStore.getState().setKeyDown(e.key, true);
            Continuum_Canvas.inputBiding.runAction();
        });
        window.addEventListener("keyup", (e) => {
            useKeyStore.getState().setKeyDown(e.key, false);
            Continuum_Canvas.inputBiding.runAction();
        });
        if (!Continuum_Canvas.viewportManager.viewport) return;

        Continuum_Canvas.viewportManager.viewport.addEventListener('mousemove', (e) => {
            Continuum_Canvas.cursorManager.updateCursorPosition({x: e.globalX, y: e.globalY});
        });

        Continuum_Canvas.viewportManager.viewport.on("pointerdown", (e) => {
            useCanvasStore.getState().setAdvanceToolsVisibility(false);
            this.updateInputStore(e);
            this.updateKeyStore(e);
            Continuum_Canvas.inputBiding.runAction();
        });
        Continuum_Canvas.viewportManager.viewport.on("pointermove", (e) => {
            this.updateInputStore(e);
            Continuum_Canvas.inputBiding.runAction();
        });
        Continuum_Canvas.viewportManager.viewport.on("pointerup", (e) => {
            this.updateInputStore(e);
            this.updateKeyStore(e);
            Continuum_Canvas.inputBiding.runAction();
        });

        Continuum_Canvas.viewportManager.viewport.on("pointercancel", (e) => {
            this.updateInputStore(e);
            this.updateKeyStore(e);
            Continuum_Canvas.inputBiding.runAction();
        });

        Continuum_Canvas.viewportManager.viewport.on("pointerout", (e) => {
            this.updateInputStore(e);
            this.updateKeyStore(e);
            Continuum_Canvas.inputBiding.runAction();
        });
    }

    private updateInputStoreFunction(e: FederatedPointerEvent) {
        useInputStore.getState().setPressure(e.pressure || 0);
        useInputStore.setState((state) => {
            state.pointerType = e.pointerType as PointerType;
            if (this.rect) {
                const x = e.clientX - this.rect.left;
                const y = e.clientY - this.rect.top;
                const worldCords = Continuum_Canvas.viewportManager.viewport!.toWorld(
                    {x, y}
                );
                state.mousePosition.x = worldCords.x;
                state.mousePosition.y = worldCords.y;
            }
        });
    }


    public updateInputStore(e: FederatedPointerEvent) {
        this.updateInputThrottled(e);
    }

    public setUpRect() {
        if (this.rect !==  null) return;
        const c = Continuum_Canvas.appInstance?.canvas.getBoundingClientRect();
        if (c) {
            this.rect= {top:c.top, left: c.left};
        }
    }

    public updateKeyStore(e: FederatedPointerEvent) {
        useKeyStore.setState((state) => {
            state.mouseButtons = e.buttons;
            state.pointerDown = e.pressure > 0;
        });
    }

    public SwitchState(state: AppCanvasState) {
        useKeyStore.setState(x => {
            x.currentAppCanvasState = state
        });
    }

}
