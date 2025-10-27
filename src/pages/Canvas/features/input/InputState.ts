import { FederatedPointerEvent } from "pixi.js";
import { Continuum_Canvas } from "../CanvasApp";
import { SimplePoint } from "../../data/types/PointTypes";
import { Continuum_CanvasViewport } from "../service/Viewport";

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

export class Continuum_InputState {
  private state: InputState = {
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
    if (  Continuum_CanvasViewport.viewport) {
      Continuum_CanvasViewport.viewport.on("pointerdown", (e) => this.updatePointerEvent(e));
      Continuum_CanvasViewport.viewport.on("pointermove", (e) => this.updatePointerEvent(e));
      Continuum_CanvasViewport.viewport.on("pointerup", (e) => this.updatePointerEvent(e));
      Continuum_CanvasViewport.viewport.on("pointercancel", (e) => this.updatePointerEvent(e));
    }
  }

  public updatePointerEvent(e: FederatedPointerEvent) {
    const originalEvent = e;
    this.state.pressure = originalEvent.pressure || 0;
    this.state.tiltX = originalEvent.tiltX || 0;
    this.state.tiltY = originalEvent.tiltY || 0;
    this.state.pointerType = this.setPointerType(e.pointerType);
    this.state.mouseButtons = e.buttons;
    this.updateMousePoint(e);
    
  }

  private updateMousePoint(e: FederatedPointerEvent) {
    const canvas = Continuum_Canvas.appInstance?.canvas;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.state.mousePosition = {
      x,
      y,
    };
  }

  private updateKeyDown(e: KeyboardEvent) {
    this.state.keyDown.add(e.key.toLowerCase());
  }

  private updateKeyUp(e: KeyboardEvent) {
    this.state.keyDown.delete(e.key.toLowerCase());
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
}
