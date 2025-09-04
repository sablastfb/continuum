// import { ICommand } from "./ICommand";

import useCanvasStore from "../../data/store/CanvasStore";


export interface ICommand {
  execute(): void;
  undo(): void;
}


export class CommandManager{
    public history: ICommand[] = [];

    public addNewCommand(customCommand: ICommand){
      this.history.push(customCommand);
      useCanvasStore.getState().setHistoryPosition(this.history.length-1);
    }

    public goBack(){
      if (history.length >= 1){
        const historyPosition =  useCanvasStore.getState().historyPosition;
        debugger;
        const c = this.history[historyPosition];
        console.log(c);
        useCanvasStore.getState().setHistoryPosition(historyPosition-1);
        c.undo();
      }
    }

    public goInFuture(){
        // const historyPosition =  useCanvasStore.getState().historyPosition;

        // if (history.length >= historyPosition ){
        //   // TODO
        //   const c = this.history[historyPosition-1];
        //   this.historyPosition--;
        //   c.execute(); 
        // }
    }
    // public canGoBack(){
    //   return this.historyPosition !== -1;
    // }
    // public canGoInFuture(){
    //   return history.length >= this.historyPosition;
    // }
}