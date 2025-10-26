import { FederatedPointerEvent } from "pixi.js";
import { Continuum_Canvas } from "../CanvasApp";

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

  public init() {
    window.addEventListener("keydown", (e) => this.handleKeyDown(e));
    window.addEventListener("keyup", (e) => this.handleKeyUp(e));
    const canvas = Continuum_Canvas.appInstance?.canvas;
    if (canvas) {
    //   canvas.addEventListener("pointerdown", (e) =>
    //     this.handlePointerDown(e as PointerEvent)
    //   );
    //   canvas.addEventListener("pointermove", (e) =>
    //     this.handlePointerMove(e as PointerEvent)
    //   );
    //   canvas.addEventListener("pointerup", (e) =>
    //     this.handlePointerUp(e as PointerEvent)
    //   );
    //   canvas.addEventListener("pointercancel", (e) =>
    //     this.handlePointerCancel(e as PointerEvent)
    //   );

      // Enable touch action for proper touch handling
      canvas.style.touchAction = "none";
      this.takeStateSnappshot();
    }
  }

  public updateState(e: FederatedPointerEvent) {
    const originalEvent = e.nativeEvent || e;
    this.state.mousePosition = {
      x: e.global.x,
      y: e.global.y,
    };

    if ("pressure" in originalEvent) {
      this.state.pressure = (originalEvent as any).pressure || 0;
    }
    if ("tiltX" in originalEvent && "tiltY" in originalEvent) {
      this.state.tiltX = (originalEvent as any).tiltX || 0;
      this.state.tiltY = (originalEvent as any).tiltY || 0;
    }
  }

  public takeStateSnappshot(){
    console.table(this.state);
  }


  public mouseDown(e: FederatedPointerEvent) {
    this.state.mouseButtons.add(e.button as MouseButton);
  }
  public mouseUp(e: FederatedPointerEvent) {
    this.state.mouseButtons.delete(e.button as MouseButton);
  }
  public mouseMove(e: MouseEvent) {
    // Header padding removed
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

  private handleKeyDown(e: KeyboardEvent) {
    this.state.keyDown.add(e.key.toLowerCase());
  }

  private handleKeyUp(e: KeyboardEvent) {
    this.state.keyDown.delete(e.key.toLowerCase());
  }

  private updatePointerType(pointerType: any) {
    const typeStr = String(pointerType).toLowerCase();

    if (typeStr === "pen") {
      this.state.pointerType = PointerType.PEN;
    } else if (typeStr === "touch") {
      this.state.pointerType = PointerType.TOUCH;
    } else if (typeStr === "mouse") {
      this.state.pointerType = PointerType.MOUSE;
    } else {
      this.state.pointerType = PointerType.UNKNOWN;
    }
  }

  private updateModifiers(e: KeyboardEvent | MouseEvent | Event) {
    if ("ctrlKey" in e) {
      this.state.ctrl = e.ctrlKey;
      this.state.shift = e.shiftKey;
      this.state.alt = e.altKey;
      this.state.meta = e.metaKey;
    }
  }
}
