import useBackgroundStore from "../data/store/BackgroundStore.ts";
import { Application } from "pixi.js";
import { ToolManager } from "./tools/ToolManager";
import { ColorPalette } from "../data/palet/PaletteContainer.ts";
import { ResizeService } from "./service/Resize";
import { CanvasViewport as CanvasViewport } from "./service/Viewport";
import { Continuum_CommandManager } from "./commands/CommandManager";
import { Continuum_CurveService } from "./service/CurveService";
import { InputStateManager } from "./input/InputState";
import { InputBindings } from "./input/InputBiding";
import { ThicknessPalette } from "../data/thicknes/ThickneContainer";
import { BackgroundService } from "./service/Bacgroun";
import { ShapeShaderService } from "./service/Shader/ShapeShaderService";
import { BackgroundShaderService } from "./service/Shader/BackgroundShaderService.ts";
import { MeshManager } from "./service/MeshCreator";
import { CursorManager } from "./cursors/CursorManager";
import { BookmarkService } from "./service/Bookmark";

export namespace Continuum_Canvas {
  export let appInstance: Application | null = null;
  export let initPromise: Promise<Application> | null = null;

  export let viewportManager: CanvasViewport;
  export const commandManage = new Continuum_CommandManager();
  export const inputStateManager = new InputStateManager();
  export const inputBiding = new InputBindings();
  export const cursorManager = new CursorManager();
  export const toolManager = new ToolManager();
  export const resizeService = new ResizeService();
  export const bookMarkService = new BookmarkService();
  export const colorPalette = new ColorPalette();
  export const thicknessPalette = new ThicknessPalette();
  export const shapeShaderService = new ShapeShaderService();
  export const backgroundService = new BackgroundService();
  export const backgroundShaderService = new BackgroundShaderService();
  export const meshCreator = new MeshManager();

  export async function creatPixiApp() {
    if (appInstance) {
      return appInstance;
    }
    if (initPromise) {
      return initPromise;
    }

    initPromise = setUpApplication();
    appInstance = await initPromise;
    return appInstance;
  }

  async function setUpApplication(): Promise<Application> {
    const app = new Application();
    await app.init({
      autoDensity: true,
      antialias: true,
      resolution: window.devicePixelRatio || 1,

      background: colorPalette.getColor(useBackgroundStore.getState().fillColorId),
    });

    Continuum_Canvas.appInstance = app;
    Continuum_Canvas.viewportManager = new CanvasViewport();
    await Continuum_CurveService.init();
    Continuum_Canvas.backgroundService.init();
    if (Continuum_Canvas.viewportManager.viewport) {
      app.stage.addChild(Continuum_Canvas.viewportManager.viewport);
      app.stage.addChild(Continuum_Canvas.cursorManager.cursorGraphics);
    }

    Continuum_Canvas.cursorManager.updateCursorGraphics();
    inputStateManager.subscribeEvents();
    Continuum_Canvas.resizeService.handleResize();
    return app;
  }

  export function IsCanvasReady() {
    return (
      Continuum_Canvas.appInstance && Continuum_Canvas.appInstance.renderer
    );
  }
}
