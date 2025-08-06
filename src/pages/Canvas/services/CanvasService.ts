import { Viewport } from "pixi-viewport";
import { Application, FederatedMouseEvent, Graphics } from "pixi.js";

export namespace Canvas {
  let appInstance: Application | null = null;
  let viewport: Viewport | null = null;
  let graph: Graphics;
  let drawing = false;

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
  }

 export  function drawLine(e: FederatedMouseEvent, color: string) {
    if (!drawing) return;
    if (graph === undefined) return;
    const viewport = getViewport();
    const worldPos = viewport.toWorld(e.global);
    graph.lineTo(worldPos.x, worldPos.y);
    graph.stroke({ width: 2, color: "white", cap:"round" });
    graph.tint = color;
  }

  export function stopDrawing(e: FederatedMouseEvent){
    if (!drawing) return;
    drawing = false;
  }
}
