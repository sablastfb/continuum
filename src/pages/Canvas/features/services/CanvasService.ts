import { Viewport } from "pixi-viewport";
import { Application, Graphics } from "pixi.js";

import { ZoomedEvent } from "pixi-viewport/dist/types";
import { throttle } from "lodash";
import { ToolType } from "../../data/CanvasTypes";
import useCanvasStore from "../../data/CanvasStore";
import { ToolsManager } from "../tools/ToolManager";

export namespace Canvas {
  let appInstance: Application | null = null;
  let viewport: Viewport | null = null;
  let toolsManager: ToolsManager;
  let cursor: Graphics;
  let drawing = false;

  export async function getPixiApp() {
    if (appInstance) return appInstance;
    await setUpAplication();
    setUpViewportAndEvent();
    setUpResize();
    return appInstance;
  }

  async function setUpAplication() {
    appInstance = new Application();
    await appInstance.init({ background: "#222", resizeTo: window });
    cursor = new Graphics();

    viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1024,
      worldHeight: 1024,
      events: appInstance.renderer.events,
    });

    appInstance.stage.addChild(viewport);
    appInstance!.stage.addChild(cursor);

    toolsManager = new ToolsManager(viewport, useCanvasStore);
  }

  const throttledDraw = throttle((e) => {
    if (!drawing) return;
    toolsManager.getCurrentTool()?.updateCursor(cursor, e);
    toolsManager.getCurrentTool()?.draw(e);
  }, 16);

  function setUpViewportAndEvent() {
    if (viewport === null) return;
    viewport.drag({ mouseButtons: "middle" }).pinch().wheel();
    viewport
      .on("zoomed", (e: ZoomedEvent) => {
        useCanvasStore.getState().setZoom(e?.viewport.scale.x);
      })
      .on("mousedown", (e) => {
        if (drawing) return;
        drawing = true;
        toolsManager.getCurrentTool()?.startDrawing(e);
      })
      .on("mousemove", (e) => {
          throttledDraw(e);
      })
      .on("mouseup", (e) => {
        if (!drawing) return;

        drawing = false;
        toolsManager.getCurrentTool()?.stopDrawing(e);
      })
      .on("mouseout", (e) => {
        if (!drawing) return;
        drawing = false;
        toolsManager.getCurrentTool()?.stopDrawing(e);
      });
  }

  function setUpResize() {
    window.addEventListener("resize", handleResize);
    handleResize();
  }

  function handleResize() {
    if (!appInstance || !viewport) return;
    viewport.resize(window.innerWidth, window.innerHeight, 1024, 1024);
  }

  export function changeTool(toolType: ToolType) {
    if (toolsManager === null) return;
    toolsManager.setTool(toolType);
  }
}
