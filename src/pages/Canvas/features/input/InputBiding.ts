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
      keys: ["ctrl", "z"],
      action: () => console.log("Undo!"),
      appState: "IDELE",
    },
    {
      mouseButtons: [MouseButton.LEFT],
      action: () => console.log("Undo!"),
      appState: "IDELE",
    },
  ];

  public getBiding(inputState: InputState, appState: AppCanvasState) {
    const match =this.bindings.filter(
      (x) =>
        x.appState === appState &&
        this.matchKeys(inputState, x.keys) &&
        this.matchMouse(inputState, x.mouseButtons)
    );

    return this.bindings[0];
  }

  public addBinding(InputBinding: InputBinding) {}

  public removeBinding() {}

  private matchKeys(inputState: InputState, keys?: string[]) {
    if (!keys) return true;
  }

  private matchMouse(inputState: InputState, mouseButtons?: MouseButton[]) {
    if (!mouseButtons) return true;
    return mouseButtons.every(i => i & inputState.mouseButtons);
  }
}
