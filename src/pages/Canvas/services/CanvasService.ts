import { Viewport } from "pixi-viewport";
import { Application, FederatedMouseEvent, Graphics } from "pixi.js";
import { Point } from "./CanvasTypes";
import { Distance } from "./CanvasUtils";
import { MinimumDistanceToNextLine } from "../CanvasConstants";

export namespace Canvas {
  let appInstance: Application | null = null;
  let viewport: Viewport | null = null;
  let graph: Graphics;
  let drawing = false;
  let lastPoint: Point = {x: 0, y: 0};

  export async function getPixiApp() {
    if (appInstance) return appInstance;
    appInstance = new Application();
    await appInstance.init({ background: "black", resizeTo: window });
    viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1024,
      worldHeight: 1024,
      events: appInstance.renderer.events,
    });

    appInstance.stage.addChild(viewport);
    viewport.drag({ mouseButtons: "middle" }).pinch().wheel();

    return appInstance;
  }

  export function getViewport() {
    if (viewport) {
      return viewport;
    }
    throw Error("");
  }

  export function  startToDraw(e: FederatedMouseEvent) {
    if (drawing) return;
    drawing = true;
    const viewport = getViewport();
    const worldPos = viewport.toWorld(e.global);
    graph =  new Graphics();
    graph.moveTo(worldPos.x, worldPos.y);
    graph.stroke({ width: 10, color: "white", cap:"round", join: "round" });
    viewport.addChild(graph);
    lastPoint = {x: worldPos.x, y: worldPos.y};
    count=0;
  }

 export  function drawLine(e: FederatedMouseEvent, color: string) {
    if (!drawing) return;
    if (graph === undefined) return;
    const viewport = getViewport();
    const worldPos = viewport.toWorld(e.global) as Point;
    if (Distance(worldPos, lastPoint) < MinimumDistanceToNextLine) {
      return;
    }

    graph.lineTo(worldPos.x, worldPos.y);
    graph.stroke({ width: 2, color: "white", cap:"round", join: "round" });
    graph.tint = color;
    count++;

    lastPoint = {x: worldPos.x, y: worldPos.y};
  }
  let count = 0;
  export function stopDrawing(e: FederatedMouseEvent){
    if (!drawing) return;
    drawing = false;
    console.log(count);
  }
}
