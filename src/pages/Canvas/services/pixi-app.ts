import { Viewport } from "pixi-viewport";
import { ZoomedEvent } from "pixi-viewport/dist/types";
import { Application, FederatedMouseEvent, Graphics } from "pixi.js";

export namespace Canvas {
  let appInstance: Application | null = null;
  let viewport: Viewport | null = null;

  export async function getPixiApp() {
    if (appInstance) return appInstance;
    console.log("Createing new app. ");
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
    viewport.on("mousedown", (e) => {
      startToDraw(e);
    })
    .on("mousemove", (e) => {
      drawLine(e);
    })
    .on("mouseup", (e) => {
      stopDrawing(e);
    }).on("mouseout", (e) => {
      stopDrawing(e);
    });

    return appInstance;
  }

  export function getViewport() {
    if (viewport) {
      return viewport;
    }
    throw Error("");
  }

  let graph: Graphics;
  let drawing = false;
  let count = 0;

  function startToDraw(e: FederatedMouseEvent) {
    if (drawing) return;
    drawing = true;
    const viewport = getViewport();
    const worldPos = viewport.toWorld(e.global);
    graph =  new Graphics();
    graph.moveTo(worldPos.x, worldPos.y);
    graph.moveTo(worldPos.x, worldPos.y);
    graph.stroke({ width: 10, color: "white", cap:"round" });
    graph.tint = "yellow";
    viewport.addChild(graph);
    count = 0;
  }

  function drawLine(e: FederatedMouseEvent) {
    if (!drawing) return;
    if (graph === undefined) return;
    const viewport = getViewport();
    const worldPos = viewport.toWorld(e.global);
    graph.lineTo(worldPos.x, worldPos.y);
    graph.stroke({ width: 10, color: "white", cap:"round" });
    count +=1;
  }

  function stopDrawing(e: FederatedMouseEvent){
    if (!drawing) return;
    drawing = false;
    console.log(count);
  }
}
