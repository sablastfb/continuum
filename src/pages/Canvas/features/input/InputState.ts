import { FederatedPointerEvent } from "pixi.js";
import { Continuum_Canvas } from "../CanvasApp";
import { SimplePoint } from "../../data/types/PointTypes";
import { Continuum_CanvasViewport } from "../service/Viewport";

export type AppCanvasState = "IDELE" | "DARWING";

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
  pointerType: PointerType;
  pressure: number;
  tiltX: number;
  tiltY: number;
};

export class InputStateManager {
  private currentAppCanvasState:AppCanvasState = "IDELE";
  private inputState: InputState = {
    keyDown: new Set<string>(),
    mouseButtons: 0,
    mousePosition: {
      x: 0,
      y: 0,
    },
    pointerType: PointerType.MOUSE,
    pressure: 0,
    tiltX: 0,
    tiltY: 0,
  };

  public subscribeEvents() {
    window.addEventListener("keydown", (e) => this.updateKeyDown(e));
    window.addEventListener("keyup", (e) => this.updateKeyUp(e));
    if (Continuum_CanvasViewport.viewport) {
      Continuum_CanvasViewport.viewport.on("pointerdown", (e) =>
        this.updatePointerEvent(e)
      );
      Continuum_CanvasViewport.viewport.on("pointermove", (e) =>
        this.updatePointerEvent(e)
      );
      Continuum_CanvasViewport.viewport.on("pointerup", (e) =>
        this.updatePointerEvent(e)
      );
      Continuum_CanvasViewport.viewport.on("pointercancel", (e) =>
        this.updatePointerEvent(e)
      );
    }
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
    const biding = Continuum_Canvas.inputBidings.getBiding(this.inputState, this.currentAppCanvasState);
    if(biding.length){
      biding[0].action(this.inputState);
    }
  }

  public SwitchState(canvasState: AppCanvasState){
    this.currentAppCanvasState = canvasState;
  }

}
