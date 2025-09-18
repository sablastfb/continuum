import { Graphics } from "pixi.js";
import { CanvasCursor } from "../service/Cursor";
import { CanvasPalet } from "../../data/container/PaletContainer";
import useCanvasStore from "../../data/store/CanvasStore";
import { ThicknesPalet } from "../../data/container/ThickneContainer";
import { Continuum_ToolManager, ITool } from "../service/tools/ToolManager";
import { useEraseStore } from "../../data/store/EraseStore";
import { CanvasViewport } from "../service/Viewport";
import { graphiMap, Id } from "../data/GraphicsDataManager";
import { Continuum_LineStrategyManager, ILine } from "../Line/LineStrategyManager";
import { usePencileStore } from "../../data/store/PencileStore";
import { CollisionDetection } from "../service/ColisionDetection";
import { MouseInputPoint } from "../../Types";

export class Erase implements ITool {
  type: Continuum_ToolManager.ToolType = "eraser";
  private curve: Graphics | null = null;
  private lineStrategy: ILine | null = null;
  private activeColor: string | null = null;
  private activeThicknes: number | null = null;

  public startDrawing<P extends MouseInputPoint>(e: P) {
    if (e.button !== 0) return;
    if (!CanvasViewport.viewport) return;

    this.curve = new Graphics();
    this.curve.blendMode = 'erase';
    
    CanvasViewport.viewport.addChild(this.curve);
    this.activeColor = CanvasPalet.getColor(
      usePencileStore.getState().pencilColorId
    );
    this.activeThicknes = ThicknesPalet.getThicknes(
      usePencileStore.getState().thicknesId
    );

    this.lineStrategy = Continuum_LineStrategyManager.getActiveStrategy("bezier");
    this.lineStrategy?.startNewLine(e);

    CollisionDetection.Clear();
    // this.firsDot(e);
  }


  public draw<P extends MouseInputPoint>(e: P) {
    // if (this.curve === null) return;
    // if (!CanvasViewport.viewport) return;
        const zoom = useCanvasStore.getState().zoome;

   const radius =
        zoom * ThicknesPalet.getThicknes(useEraseStore.getState().thicknesId);
    const graphics = CollisionDetection.TestColisionWihtCursor(radius);
    if (!graphics) return;
    // for (const g of graphics){
    //   if (g){
    //     g.graph.visible = false;
    //   }
    // }
  //   const out = this.lineStrategy?.updateLinePoistion(e, this.curve);

  //   if (out?.needNew) {
  //     this.curve.stroke({
  //       width: this.activeThicknes * 2,
  //       color: "white",
  //       cap: "round",
  //       join: "round",
  //     });
  //   }
  //   this.curve.tint = this.activeColor;
  // }

  // public stopDrawing() {
  //   if (this.curve === null) return;
  //   const g: GraphicsData = {
  //     id: uuidv4(),
  //     graph: this.curve,
  //   };

  //   graphiMap.set(g.id, g);
  //   const customCommand: ICommand = {
  //     execute: () => this.show(g.id),
  //     undo: () => this.hide(g.id),
  //   };
  //   Canvas.commandManage.addNewCommand(customCommand);
  }

  private show(id: Id) {
    const g = graphiMap.get(id);
    if (g) {
      g.graph.visible = true;
    }
  }

  private hide(graph: Id) {
    const g = graphiMap.get(graph);
    if (g) {
      g.graph.visible = false;
    }
  }

  updateCursor(): void {
    const eraseMethod = useEraseStore.getState().eraseMethod;
    const zoom = useCanvasStore.getState().zoome;
    if (eraseMethod === "soft") {
      const radius =
        zoom * ThicknesPalet.getThicknes(useEraseStore.getState().thicknesId);
      CanvasCursor.cursor.clear();
      CanvasCursor.cursor
        .circle(0, 0, radius)
        .fill({ color: CanvasPalet.getColor("c-1") })
        .stroke({ width: 1, color: CanvasPalet.getColor("c-1") });
    } else if (eraseMethod === "strong") {
      const radius =
        zoom * ThicknesPalet.getThicknes(useEraseStore.getState().thicknesId);
      CanvasCursor.cursor.clear();
      CanvasCursor.cursor
        .circle(0, 0, radius)
        .fill({ color: CanvasPalet.getColor("c-1") });
    }
  }
}
