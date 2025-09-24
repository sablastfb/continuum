import { Continuum_Canvas } from "../CanvasApp";
import { graphicOnCanvas, GraphicsData, Id } from "../data/GraphicsDataManager";
import { ICommand } from "./CommandManager";

export class GraphicsCommand {
  static addNew(graphic: GraphicsData) {
    console.log("domo");
    const customCommand: ICommand = {
      execute: () => this.show(graphic.id),
      undo: () => this.hide(graphic.id),
    };
    Continuum_Canvas.commandManage.addNewCommand(customCommand);
  }

  static removeGraphics(graphics: GraphicsData[]) {
    if (graphics.length === 0) return;
    const customCommand: ICommand = {
      execute: () => graphics.forEach((g) => this.hide(g.id)),
      undo: () => graphics.forEach((g) => this.show(g.id)),
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
