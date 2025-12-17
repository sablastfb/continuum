import { drawingBidings } from "./DrawingState";
import { idleSidings } from "./IdleState";
import { AppCanvasState, InputState, MouseButton } from "./InputState";

export type InputBinding = {
  keys?: string[];
  pointerDown?: boolean,
  mouseButtons?: MouseButton[];
  action: (state: InputState) => void;
  appState: AppCanvasState[];
};

export class InputBindings {
  private bindings: InputBinding[] = [
    ...drawingBidings,
    ...idleSidings
  ];

  public getBiding(inputState: InputState, appState: AppCanvasState) {
    const match = this.bindings.filter(
      (x) =>
        inputState.pointerDown === x.pointerDown && 
        x.appState.includes(appState) &&
        this.matchMouse(inputState, x.mouseButtons)
    );
    return match;
  }

  public addBinding() {}

  public removeBinding() {}



  private matchMouse(inputState: InputState, mouseButtons?: MouseButton[]) {
    if (!mouseButtons) return true;
    return mouseButtons.every(button => {
      return (1<<button) & inputState.mouseButtons});
  }
}
