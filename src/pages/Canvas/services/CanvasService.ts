import { Viewport } from "pixi-viewport";
import { Application, FederatedMouseEvent, Graphics } from "pixi.js";
import { Point } from "./CanvasTypes";
import { Distance } from "./CanvasUtils";
import { MinimumDistanceToNextLine, ZoomSensitivity } from "../CanvasConstants";
import { throttle } from "lodash";
import { ZoomedEvent } from "pixi-viewport/dist/types";
import useCanvasStore from "../CanvasStore";

export namespace Canvas {
  let appInstance: Application | null = null;
  let viewport: Viewport | null = null;
  let graph: Graphics;
  let drawing = false;
  let lastPoint: Point = { x: 0, y: 0 };

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
    const drawPencileThrottle = throttle((e) => {
      drawPencile(e);
    }, 16);
    appInstance.stage.addChild(viewport);
    viewport.drag({ mouseButtons: "middle" }).pinch().wheel();
    viewport
      .on("zoomed", (e: ZoomedEvent) => {
        useCanvasStore.getState().setZoom(e?.viewport.scale.x);
      })
      .on("mousedown", (e) => {
        Canvas.startToDraw(e);
      })
      .on("mousemove", drawPencileThrottle)
      .on("mouseup", (e) => {
        Canvas.stopDrawing(e);
      })
      .on("mouseout", (e) => {
        Canvas.stopDrawing(e);
      });

    return appInstance;
  }

  export function getViewport() {
    if (viewport) {
      return viewport;
    }
    throw Error("");
  }

  export function startToDraw(e: FederatedMouseEvent) {
    if (drawing) return;
    drawing = true;
    const viewport = getViewport();
    const worldPos = viewport.toWorld(e.global);
    graph = new Graphics();
    graph.moveTo(worldPos.x, worldPos.y);
    graph.stroke({ width: 10, color: "white", cap: "round", join: "round" });
    viewport.addChild(graph);
    lastPoint = { x: worldPos.x, y: worldPos.y };
    count = 0;
  }

  export function drawPencile(e: FederatedMouseEvent) {
    if (!drawing) return;
    if (graph === undefined) return;
    const viewport = getViewport();
    const worldPos = viewport.toWorld(e.global) as Point;
    if (Distance(worldPos, lastPoint) < MinimumDistanceToNextLine) {
      return;
    }

    graph.lineTo(worldPos.x, worldPos.y);
    graph.stroke({ width: 2, color: "white", cap: "round", join: "round" });
    const color = useCanvasStore.getState().color;

    graph.tint = color;
    count++;
    lastPoint = { x: worldPos.x, y: worldPos.y };
  }
  let count = 0;
  export function stopDrawing(e: FederatedMouseEvent) {
    if (!drawing) return;
    drawing = false;
    console.log(count);
  }

  export function zoom(zoomeDirection: number) {
    const zoome = useCanvasStore.getState().zoome;
    const zomeValue = zoome + zoomeDirection * ZoomSensitivity;
    useCanvasStore.getState().setZoom(zoome + zoomeDirection * ZoomSensitivity);
    const viewport = getViewport();
    viewport.setZoom(zomeValue);
  }
}
