import { MouseInputPoint } from "../../data/types/Types";

export enum MouseButton {
  Left = 0,
  Middle = 1,
  Right = 2,
  Back = 3,
  Forward = 4,
  None = -1,
}

export class Continuum_MouseService {
  private static readonly BUTTON_MASKS: { [key in MouseButton]?: number } = {
    [MouseButton.Left]: 1,
    [MouseButton.Right]: 2,
    [MouseButton.Middle]: 4,
    [MouseButton.Back]: 8,
    [MouseButton.Forward]: 16,
  };

  static isButtonPressed<P extends MouseInputPoint>(event: P, button: MouseButton): boolean {
    if (button === MouseButton.None) return event.buttons === 0;
    const mask = this.BUTTON_MASKS[button];
    return mask !== undefined ? (event.buttons & mask) !== 0 : false;
  }

    static isButtonReleased<P extends MouseInputPoint>(event: P, button: MouseButton): boolean {
    return event.button === button;
  }

  static isDragging<P extends MouseInputPoint>(
    event: P,
    button: MouseButton,
    movementThreshold: number = 0.2
  ): boolean {
    return (
      this.isButtonPressed(event, button) &&
      (Math.abs(event.movementX) > movementThreshold ||
       Math.abs(event.movementY) > movementThreshold)
    );
  }
}