import { Viewport } from "pixi-viewport";
import { Application } from "pixi.js";

let appInstance: Application | null = null;
let viewport: Viewport | null = null;

export async function getPixiApp() {
  if (appInstance) return appInstance;
  console.log("Createing new app. ");
  appInstance = new Application();
  await appInstance.init({ background: "gray", resizeTo: window });
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

export function getViewPort() {
  if (viewport) {
    return viewport;
  }
  throw Error("");
}
