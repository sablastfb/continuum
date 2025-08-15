import { Viewport } from "pixi-viewport";
import { Application, Graphics } from "pixi.js";
import { ToolsManager, ToolType } from "./tools/ToolManager";
import { CanvasBacground } from "./service/Background";
import { CanvasPalet } from "../data/container/PaletContainer";
import useSettingsStore from "../data/store/SettingsStore";
import { CanvasResize } from "./service/Resize";
import { CanvasCursor } from "./service/Cursor";
import { CanvasViewport } from "./service/Viewport";

export namespace Canvas {
  export let appInstance: Application | null = null;
  export let toolsManager: ToolsManager;
  export let drawing = false;

  export async function getPixiApp() {
    if (appInstance) {
      CanvasCursor.updateCursor();
      CanvasCursor.updateCursorVisibilty();
      return appInstance;
    }

    await setUpAplication();
    CanvasViewport.setUpViewportAndEvent();
    CanvasResize.setUpResize();
    CanvasCursor.updateCursor();
    CanvasBacground.changeBackground(useSettingsStore.getState().background);
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

    CanvasViewport.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1024,
      worldHeight: 1024,
      events: appInstance.renderer.events,
    });

    appInstance.stage.addChild(CanvasViewport.viewport);
    appInstance!.stage.addChild(CanvasCursor.cursor);

    toolsManager = new ToolsManager(CanvasViewport.viewport);
  }

  export function changeTool(toolType: ToolType) {
    if (toolsManager === null) return;
    toolsManager.setTool(toolType);
  }
}
