import { Application } from "pixi.js";
import { Continuum_ToolManager } from "./tools/ToolManager";
import { CanvasBacground } from "./service/Background";
import { CanvasPalet } from "../data/container/PaletContainer";
import useSettingsStore from "../data/store/SettingsStore";
import { CanvasResize } from "./service/Resize";
import { CanvasCursor } from "./service/Cursor";
import { CanvasViewport } from "./service/Viewport";
import { CommandManager } from "./commands/CommandManager";
import { Continuum_LineStrategyManager } from "./Line/LineStrategyManager";
import { CurveService } from "./service/CurveService";

export namespace Continuum_Canvas {
  export let appInstance: Application | null = null;
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
    CurveService.init();
    CanvasBacground.changeBackground(useSettingsStore.getState().background);
    return appInstance;
  }

  async function setUpAplication() {
    appInstance = new Application();
    await appInstance.init({
      antialias: true,
      autoDensity: true,
      background: CanvasPalet.getColor(
        useSettingsStore.getState().background.color
      ),
    });
    appInstance.renderer.resize(window.innerWidth, window.innerHeight);
    CanvasCursor.init();
    CanvasViewport.init();

    if (!CanvasViewport.viewport) return; 
    appInstance!.stage.addChild(CanvasViewport.viewport);
    appInstance!.stage.addChild(CanvasCursor.cursor);
    Continuum_ToolManager.setUpToolManager();
    Continuum_LineStrategyManager.registerDefaulStrategyes();
  }
}
