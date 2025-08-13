import { Viewport } from "pixi-viewport";
import {
  Application,
  FederatedPointerEvent,
  Graphics,
  TilingSprite,
} from "pixi.js";

import { ZoomedEvent } from "pixi-viewport/dist/types";
import { throttle } from "lodash";
import { ToolType } from "../data/types/CanvasTypes";
import { ToolsManager } from "./tools/ToolManager";
import { ZoomSensitivity } from "../data/constants/CanvasConstants";
import { CanvasBacground } from "./service/Background";
import useCanvasStore from "../data/store/CanvasStore";
import { CanvasPalet } from "../data/container/PaletContainer";

export namespace Canvas {
  export let appInstance: Application | null = null;
  export let viewport: Viewport | null = null;
  export let toolsManager: ToolsManager;
  export let backgroundTexture: TilingSprite;
  let cursor: Graphics;
  let drawing = false;

  export async function getPixiApp() {
    if (appInstance) {
      updateCursor();
      updateCursorVisibilty();
      return appInstance;
    }

    await setUpAplication();
    setUpViewportAndEvent();
    setUpResize();
    setUpCommandManager();
    updateCursor();
    CanvasBacground.changeBackground( useCanvasStore.getState().canvasSettings.background);
    return appInstance;
  }

  async function setUpAplication() {
    appInstance = new Application();
    await appInstance.init({
      background: CanvasPalet.getColor( useCanvasStore.getState().canvasSettings.background.color),
      resizeTo: window,
    });
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

  function setUpCommandManager() {}

  const throttledDraw = throttle((e: FederatedPointerEvent) => {
    if (drawing && e.buttons == 1) {
      toolsManager.getCurrentTool()?.draw(e);
    }
  }, 16);

  export const updateCursor = () => {
    if (toolsManager) {
      toolsManager.getCurrentTool()?.updateCursor(cursor);
    }
  };

  export const updateCursorVisibilty = () => {
    if (cursor) {
      cursor.visible = useCanvasStore.getState().canvasCursorActive;
    }
  };

  export const moveCursor = throttle((e: FederatedPointerEvent) => {
    cursor.x = e.global.x;
    cursor.y = e.global.y;
  }, 1);

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
        moveCursor(e);
      })
      .on("mouseup", (e) => {
        if (!drawing) return;
        drawing = false;
        toolsManager.getCurrentTool()?.stopDrawing(e);
      })
      .on("mouseout", (e) => {
        cursor.visible = false;
        if (!drawing) return;
        drawing = false;
        toolsManager.getCurrentTool()?.stopDrawing(e);
      })
      .on("zoomed", (e) => {
        if (Canvas.backgroundTexture && viewport?.scale.x) {
          Canvas.backgroundTexture.tileScale.x = viewport?.scale.x;
          Canvas.backgroundTexture.tileScale.y = viewport?.scale.y;
        }
      })
      .on("moved", () => {
        if (Canvas.backgroundTexture && viewport?.scale.x) {
          Canvas.backgroundTexture.tilePosition.x = viewport?.x;
          Canvas.backgroundTexture.tilePosition.y = viewport?.y;
        }
      });
  }

  function setUpResize() {
    window.addEventListener("resize", handleResize);
    handleResize();
  }

  function handleResize() {
    if (!appInstance || !viewport) return;
    viewport.resize(window.innerWidth, window.innerHeight, 1024, 1024);
    if ( Canvas.backgroundTexture ){
      Canvas.backgroundTexture.width = window.innerWidth;
      Canvas.backgroundTexture.height = window.innerHeight;
    }
  }

  export function changeTool(toolType: ToolType) {
    if (toolsManager === null) return;
    toolsManager.setTool(toolType);
  }

  export function zoom(zoomeDirection: number) {
    if (viewport === null) return;
    const zoome = useCanvasStore.getState().zoome;
    const zomeValue = zoome + zoomeDirection * ZoomSensitivity;
    useCanvasStore.getState().setZoom(zoome + zoomeDirection * ZoomSensitivity);
    viewport.setZoom(zomeValue);
  }
}
