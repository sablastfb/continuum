import { Application } from "pixi.js";
import { Continuum_ToolManager } from "./tools/ToolManager";
import { Continuum_CanvasBacground } from "./service/Background";
import { CanvasPalet } from "../data/container/PaletContainer";
import useSettingsStore from "../data/store/SettingsStore";
import { Continuum_ResizeService } from "./service/Resize";
import { Continuum_CanvasCursor } from "./service/Cursor";
import { Continuum_CanvasViewport } from "./service/Viewport";
import { Continuum_CommandManager } from "./commands/CommandManager";
import { Continuum_LineStrategyManager } from "./Line/LineStrategyManager";
import { Continuum_CurveService } from "./service/CurveService";

export namespace Continuum_Canvas {
  export let appInstance: Application | null = null;
  export let drawing = false;
  export let commandManage = new Continuum_CommandManager();

  export async function creatPixiApp() {
    if (appInstance) {
      Continuum_CanvasCursor.updateCursor();
      Continuum_CanvasCursor.updateCursorVisibilty();
      return appInstance;
    }

    await setUpAplication();
    Continuum_CanvasViewport.setUpViewportAndEvent();
    Continuum_ResizeService.setUpResize();
    Continuum_CanvasCursor.updateCursor();
    Continuum_CanvasBacground.changeBackground(useSettingsStore.getState().background);
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
    Continuum_CanvasCursor.init();
    Continuum_CanvasViewport.init();
    Continuum_CurveService.init();
    Continuum_ToolManager.init();
    Continuum_LineStrategyManager.init();

    if (!Continuum_CanvasViewport.viewport) return; 
    appInstance!.stage.addChild(Continuum_CanvasViewport.viewport);
    appInstance!.stage.addChild(Continuum_CanvasCursor.cursor);
  }
}
