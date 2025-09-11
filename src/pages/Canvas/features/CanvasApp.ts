import { Viewport } from "pixi-viewport";
import { Application, Graphics } from "pixi.js";
import { ToolsManager, ToolType } from "./tools/ToolManager";
import { CanvasBacground } from "./service/Background";
import { CanvasPalet } from "../data/container/PaletContainer";
import useSettingsStore from "../data/store/SettingsStore";
import { CanvasResize } from "./service/Resize";
import { CanvasCursor } from "./service/Cursor";
import { CanvasViewport } from "./service/Viewport";
import { LineStrategyManager } from "./service/Line/LineStrategyManager";
import { CommandManager } from "./commands/CommandManager";

export namespace Canvas {
  export let appInstance: Application | null = null;
  export let toolsManager: ToolsManager;
  export let lineStrategy: LineStrategyManager;
  export let drawing = false;
  export let commandManage = new CommandManager();

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
      antialias: true,
      resolution: 4,
      autoDensity: true,
      background: CanvasPalet.getColor(
        useSettingsStore.getState().background.color
      ),
      resizeTo: window,
    });

    CanvasCursor.cursor = new Graphics();

    CanvasViewport.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      events: appInstance.renderer.events,
      threshold: 5,
      passiveWheel: true,
    });

    appInstance!.stage.addChild(CanvasViewport.viewport);
    appInstance!.stage.addChild(CanvasCursor.cursor);

    toolsManager = new ToolsManager();
    lineStrategy = new LineStrategyManager();
  }

  export function changeTool(toolType: ToolType) {
    if (!toolsManager) return;
    toolsManager?.setTool(toolType);
  }
}
