import { Continuum_Canvas } from "../CanvasApp";
import { graphicOnCanvas, GraphicsData, Id } from "../data/GraphicsDataManager";
import { ICommand } from "./CommandManager";

export class GraphicsCommand {
  static addNew(g: GraphicsData) {
    const customCommand: ICommand = {
      execute: () => this.show(g.id),
      undo: () => this.hide(g.id),
    };
    Continuum_Canvas.commandManage.addNewCommand(customCommand);
  }

  static show(id: Id) {
    const g = graphicOnCanvas.get(id);
    if (g) {
      g.graph.visible = true;
      g.visible = true;
    }
  }

  static hide(graph: Id) {
    const g = graphicOnCanvas.get(graph);
    if (g) {
      g.graph.visible = false;
      g.visible = false;
    }
  }
}
