import { Viewport } from "pixi-viewport";
import {
  Application,
  FederatedPointerEvent,
  Graphics,
} from "pixi.js";

import { ZoomedEvent } from "pixi-viewport/dist/types";
import { throttle } from "lodash";
import { ToolType } from "../data/types/CanvasTypes";
import { ToolsManager } from "./tools/ToolManager";
import { CanvasBacground } from "./service/Background";
import useCanvasStore from "../data/store/CanvasStore";
import { CanvasPalet } from "../data/container/PaletContainer";
import useSettingsStore from "../data/store/SettingsStore";
import { CanvasResize } from "./service/Resize";
import { CanvasCursor } from "./service/Cursor";

export namespace Canvas {
  export let appInstance: Application | null = null;
  export let toolsManager: ToolsManager;
  export let viewport: Viewport | null = null;
  export let drawing = false;

  export async function getPixiApp() {
    if (appInstance) {
      updateCursor();
      updateCursorVisibilty();
      return appInstance;
    }

    await setUpAplication();
    setUpViewportAndEvent();
    CanvasResize.setUpResize();
    setUpCommandManager();
    updateCursor();
    CanvasBacground.changeBackground(
      useSettingsStore.getState().background
    );
    return appInstance;
  }

  async function setUpAplication() {
    appInstance = new Application();
    await appInstance.init({
      background: CanvasPalet.getColor(
        useSettingsStore.getState().background.color
      ),
      resizeTo: window,
    });

    CanvasCursor.cursor = new Graphics();
    
    viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1024,
      worldHeight: 1024,
      events: appInstance.renderer.events,
    });

    appInstance.stage.addChild(viewport);
    appInstance!.stage.addChild(CanvasCursor.cursor);

    toolsManager = new ToolsManager(viewport);
  }

  function setUpCommandManager() {}

  const throttledDraw = throttle((e: FederatedPointerEvent) => {
    if (drawing && e.buttons == 1) {
      toolsManager.getCurrentTool()?.draw(e);
    }
  }, 16);

  export const updateCursor = () => {
    if (toolsManager) {
      toolsManager.getCurrentTool()?.updateCursor(CanvasCursor.cursor);
    }
  };

  export const updateCursorVisibilty = () => {
    if (CanvasCursor.cursor) {
      CanvasCursor.cursor.visible = useCanvasStore.getState().canvasCursorActive;
    }
  };

  export const moveCursor = throttle((e: FederatedPointerEvent) => {
    CanvasCursor.cursor.x = e.global.x;
    CanvasCursor.cursor.y = e.global.y;
  }, 1);

  function setUpViewportAndEvent() {
    if (viewport === null) return;
    viewport.drag({ mouseButtons: "middle" }).pinch().wheel();
    viewport
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
        CanvasCursor.cursor.visible = false;
        if (!drawing) return;
        drawing = false;
        toolsManager.getCurrentTool()?.stopDrawing(e);
      })
      .on("zoomed", (e) => {
        useCanvasStore.getState().setZoom(e?.viewport.scale.x);
        if (CanvasBacground.backgroundTexture && Canvas.viewport?.scale.x) {
          CanvasBacground.backgroundTexture.tileScale.x = Canvas.viewport?.scale.x;
          CanvasBacground.backgroundTexture.tileScale.y = Canvas.viewport?.scale.y;
        }
      })
      .on("moved", () => {
        if (CanvasBacground.backgroundTexture && Canvas.viewport?.scale.x) {
          CanvasBacground.backgroundTexture.tilePosition.x = Canvas.viewport?.x;
          CanvasBacground.backgroundTexture.tilePosition.y = Canvas.viewport?.y;
        }
      });
  }

  export function changeTool(toolType: ToolType) {
    if (toolsManager === null) return;
    toolsManager.setTool(toolType);
  }
}
  