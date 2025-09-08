// import { ICommand } from "./ICommand";

import useCanvasStore from "../../data/store/CanvasStore";

export interface ICommand {
  execute(): void;
  undo(): void;
}

export class CommandManager {
  public history: ICommand[] = [];

  public addNewCommand(customCommand: ICommand) {
    const historyPosition = useCanvasStore.getState().historyPosition;
    this.history.splice(historyPosition + 1);
    this.history.push(customCommand);
    useCanvasStore.getState().setHistoryPosition(historyPosition + 1);
    useCanvasStore.getState().setHistoryCount(this.history.length);
  }

  public goBack() {
    const historyPosition = useCanvasStore.getState().historyPosition;
    const historyCount = useCanvasStore.getState().historyCount;

    if (historyPosition <= -1) return;
    if (historyCount < 1) return;

    const c = this.history[historyPosition];
    useCanvasStore.getState().setHistoryPosition(historyPosition - 1);
    c.undo();
  }

  public goInFuture() {
    const historyPosition = useCanvasStore.getState().historyPosition;
    const historyCount = useCanvasStore.getState().historyCount;
    if(  historyPosition >= historyCount-1 ) return;
    const c = this.history[historyPosition+1 ];
    useCanvasStore.getState().setHistoryPosition(historyPosition + 1);
    c.execute();
  }
}
