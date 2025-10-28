import { Application } from "pixi.js";
import { ToolManager } from "./tools/ToolManager";
import { Continuum_CanvasPalet } from "../data/palet/PaletContainer";
import useSettingsStore from "../data/store/BacgroundStore";
import { Continuum_ResizeService } from "./service/Resize";
import { CursorManager } from "./cursor/CursorManager";
import { CanvasViewport as CanvasViewport } from "./service/Viewport";
import { Continuum_CommandManager } from "./commands/CommandManager";
import { Continuum_CurveService } from "./service/CurveService";
import { InputStateManager } from "./input/InputState";
import { InputBidings } from "./input/InputBiding";

export namespace Continuum_Canvas {
  export let appInstance: Application | null = null;
  export const commandManage = new Continuum_CommandManager();
  export const inputStateManager = new InputStateManager();
  export const inputBidings = new InputBidings();
  export const cursorManager = new CursorManager();
  export const toolManager = new ToolManager();
  export let viewportManager: CanvasViewport;

  export async function creatPixiApp() {
    if (appInstance) {
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
    Continuum_Canvas.viewportManager = new CanvasViewport();
    Continuum_CurveService.init();

    if (!viewportManager.viewport) return;
    appInstance!.stage.addChild(viewportManager.viewport);
    appInstance!.stage.addChild(Continuum_Canvas.cursorManager.cursor);

    Continuum_ResizeService.setUpResize();
    Continuum_Canvas.cursorManager.updateCursorGraphics();

    inputStateManager.subscribeEvents();
  }

  export function IsCanvasReady() {
    return (
      Continuum_Canvas.appInstance && Continuum_Canvas.appInstance.renderer
    );
  }
}
