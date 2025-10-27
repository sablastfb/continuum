import { Application } from "pixi.js";
import { Continuum_ToolManager } from "./tools/ToolManager";
import { Continuum_CanvasPalet } from "../data/palet/PaletContainer";
import useSettingsStore from "../data/store/BacgroundStore";
import { Continuum_ResizeService } from "./service/Resize";
import { Continuum_CanvasCursor } from "./cursor/CursorManager";
import { Continuum_CanvasViewport } from "./service/Viewport";
import { Continuum_CommandManager } from "./commands/CommandManager";
import { Continuum_CurveService } from "./service/CurveService";
import { InputStateManager } from "./input/InputState";
import { InputBidings } from "./input/InputBiding";

export namespace Continuum_Canvas {
  export let appInstance: Application | null = null;
  export const commandManage = new Continuum_CommandManager();
  export const inputStateManager = new InputStateManager();
  export const inputBidings  = new InputBidings();

  export async function creatPixiApp() {
    if (appInstance) {
      // Continuum_CanvasCursor.updateCursor();
      // Continuum_CanvasCursor.updateCursorVisibilty(true);
      return appInstance;
    }

    await setUpAplication();

  
    return appInstance;
  }

  async function setUpAplication() {

    appInstance = new Application();
    await appInstance.init({
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      background: Continuum_CanvasPalet.getColor(
        useSettingsStore.getState().background.color
      ),
    });
    Continuum_CanvasCursor.init();
    Continuum_CanvasViewport.init();
    Continuum_CurveService.init();
    Continuum_ToolManager.init();

    if (!Continuum_CanvasViewport.viewport) return;
    appInstance!.stage.addChild(Continuum_CanvasViewport.viewport);
    appInstance!.stage.addChild(Continuum_CanvasCursor.cursor);

    Continuum_ResizeService.setUpResize();
    Continuum_CanvasCursor.updateCursor();

    inputStateManager.subscribeEvents();
  }

  export function IsCanvasReady() {
    return (
      Continuum_Canvas.appInstance && Continuum_Canvas.appInstance.renderer
    );
  }
}
