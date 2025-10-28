import { FederatedPointerEvent } from "pixi.js";
import { Continuum_Canvas } from "../CanvasApp";
import { SimplePoint } from "../../data/types/PointTypes";

export type AppCanvasState = "IDLE" | "DARWING" | "KEY_PUSHED";

export enum PointerType {
  MOUSE = "mouse",
  PEN = "pen",
  TOUCH = "touch",
  UNKNOWN = "unknown",
}

export enum MouseButton {
  LEFT = 0,
  MIDDLE = 1,
  RIGHT = 2,
}

export type InputState = {
  keyDown: Set<string>;
  mouseButtons: number;
  mousePosition: SimplePoint;
  globalPosition: SimplePoint;
  pointerType: PointerType;
  pressure: number;
  tiltX: number;
  tiltY: number;
  pointerDown: boolean;
  pointerOwer: boolean;
};

export class InputStateManager {
  private currentAppCanvasState: AppCanvasState = "IDLE";
  private inputState: InputState = {
    keyDown: new Set<string>(),
    mouseButtons: 0,
    mousePosition: {
      x: 0,
      y: 0,
    },
    globalPosition: {
      x: 0,
      y: 0,
    },
    pointerType: PointerType.MOUSE,
    pressure: 0,
    tiltX: 0,
    tiltY: 0,
    pointerDown: false,
    pointerOwer: false,
  };

  public subscribeEvents() {
    window.addEventListener("keydown", (e) => this.updateKeyDown(e));
    window.addEventListener("keyup", (e) => this.updateKeyUp(e));
    if (!Continuum_Canvas.viewportManager.viewport) return;

    Continuum_Canvas.viewportManager.viewport.on("pointerdown", (e) => {
      this.inputState.pointerDown = true;
      this.inputState.pointerOwer = true;
      this.updatePointerEvent(e);
    });
    Continuum_Canvas.viewportManager.viewport.on("pointermove", (e) => {
      this.inputState.pointerOwer = true;

      this.updatePointerEvent(e);
    });
    Continuum_Canvas.viewportManager.viewport.on("pointerup", (e) => {
      this.inputState.pointerDown = false;
      this.inputState.pointerOwer = true;

      this.updatePointerEvent(e);
    });
    Continuum_Canvas.viewportManager.viewport.on("pointercancel", (e) => {
      this.inputState.pointerDown = false;
      this.inputState.pointerOwer = false;
      this.updatePointerEvent(e);
    });
    Continuum_Canvas.viewportManager.viewport.on("pointerout", (e) => {
      this.inputState.pointerDown = false;
      this.inputState.pointerOwer = false;
      this.updatePointerEvent(e);
    });
  }

  public updatePointerEvent(e: FederatedPointerEvent) {
    const originalEvent = e;
    this.inputState.pressure = originalEvent.pressure || 0;
    this.inputState.tiltX = originalEvent.tiltX || 0;
    this.inputState.tiltY = originalEvent.tiltY || 0;
    this.inputState.pointerType = this.setPointerType(e.pointerType);

    this.inputState.mouseButtons = e.buttons;
    const canvas = Continuum_Canvas.appInstance?.canvas;

    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.inputState.mousePosition = {
      x,
      y,
    };
    this.inputState.globalPosition = {
      x: e.global.x,
      y: e.global.y,
    };

     Continuum_Canvas.cursorManager.updateCursorState(this.inputState);
    this.runCanvasAction();
  }

  private updateKeyDown(e: KeyboardEvent) {
    this.inputState.keyDown.add(e.key.toLowerCase());
    this.runCanvasAction();
  }

  private updateKeyUp(e: KeyboardEvent) {
    this.inputState.keyDown.delete(e.key.toLowerCase());
    this.runCanvasAction();
  }

  private setPointerType(pointerType: string) {
    switch (pointerType.toLowerCase()) {
      case "mouse":
        return PointerType.MOUSE;
      case "pen":
        return PointerType.PEN;
      case "touch":
        return PointerType.TOUCH;
      default:
        return PointerType.UNKNOWN;
    }
  }

  // BAD name
  private runCanvasAction() {
    const biding = Continuum_Canvas.inputBidings.getBiding(
      this.inputState,
      this.currentAppCanvasState
    );
    if (biding.length) {
      biding[0].action(this.inputState);
    }
  }

  public EndState() {}

  public SwitchState(canvasState: AppCanvasState) {
    this.currentAppCanvasState = canvasState;
  }
}
