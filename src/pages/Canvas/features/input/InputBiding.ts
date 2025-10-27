import { Continuum_Canvas } from "../CanvasApp";
import { Continuum_ToolManager } from "../tools/ToolManager";
import { AppCanvasState, InputState, MouseButton } from "./InputState";

type InputBinding = {
  keys?: string[];
  mouseButtons?: MouseButton[];
  action: (state: InputState) => void;
  appState: AppCanvasState;
};

export class InputBidings {
  private bindings: InputBinding[] = [
    {
      mouseButtons: [MouseButton.LEFT],
      action: (e) => {
          return Continuum_ToolManager.currentTool!.draw!(e);
      },
      appState: "DARWING",
    },
    {
      mouseButtons: [MouseButton.LEFT],
      action: () => {Continuum_Canvas.inputStateManager.SwitchState("DARWING");},
      appState: "IDELE",
    },
  ];

  public getBiding(inputState: InputState, appState: AppCanvasState) {
    const match =this.bindings.filter(
      (x) =>
        x.appState === appState &&
        this.matchMouse(inputState, x.mouseButtons)
    );
    return match;
  }

  public addBinding(InputBinding: InputBinding) {}

  public removeBinding() {}

  private matchKeys(inputState: InputState, keys?: string[]) {
    if (!keys) return true;
  }

  private matchMouse(inputState: InputState, mouseButtons?: MouseButton[]) {
    if (!mouseButtons) return true;
    return mouseButtons.every(button => {
      return (1<<button) & inputState.mouseButtons});
  }
}
