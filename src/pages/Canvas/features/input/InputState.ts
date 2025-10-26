import { FederatedPointerEvent } from "pixi.js";

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
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
  meta: boolean;
  mouseButtons: Set<MouseButton>;
  mousePosition: { x: number; y: number };
  pointerType: PointerType;
  isTouchActive: boolean;
  touchCount: number;
  pressure: number;
  tiltX: number;
  tiltY: number;
};

export class Continuum_InputState {
  private state: InputState = {
    keyDown: new Set<string>(),
    ctrl: false,
    shift: false,
    alt: false,
    meta: false,
    mouseButtons: new Set<MouseButton>(),
    mousePosition: { x: 0, y: 0 },
    pointerType: PointerType.UNKNOWN,
    isTouchActive: false,
    touchCount: 0,
    pressure: 0,
    tiltX: 0,
    tiltY: 0,
  };

  init() {
    window.addEventListener("keydown", (e) => this.handleKeyDown(e));
    window.addEventListener("keyup", (e) => this.handleKeyUp(e));
  }

  updateaStaet(e: FederatedPointerEvent) {}

  private handleKeyDown(e: KeyboardEvent) {
    this.state.keyDown.add(e.key.toLowerCase());
    this.updateModifiers(e);
  }

  private handleKeyUp(e: KeyboardEvent) {
    this.state.keyDown.delete(e.key.toLowerCase());
    this.updateModifiers(e);
  }

  private  updateModifiers(e: KeyboardEvent | MouseEvent | Event) {
    if ("ctrlKey" in e) {
      this.state.ctrl = e.ctrlKey;
      this.state.shift = e.shiftKey;
      this.state.alt = e.altKey;
      this.state.meta = e.metaKey;
    }
  }
}
