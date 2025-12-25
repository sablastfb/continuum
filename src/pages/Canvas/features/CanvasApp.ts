import useBackgroundStore from "../data/store/BackgroundStore.ts";
import { Application } from "pixi.js";
import { ToolManager } from "./tools/ToolManager";
import { ColorPalette } from "../data/palet/PaletteContainer.ts";
import { ResizeService } from "./service/Resize";
import { CanvasViewport as CanvasViewport } from "./service/Viewport";
import { Continuum_CommandManager } from "./commands/CommandManager";
import { ThicknessPalette } from "../data/thicknes/ThickneContainer";
import { BackgroundService } from "./service/Background.ts";
import { ShapeShaderService } from "./service/Shader/ShapeShaderService";
import { BackgroundShaderService } from "./service/Shader/BackgroundShaderService.ts";
import { MeshManager } from "./service/MeshCreator";
import { CursorManager } from "./cursors/CursorManager";
import {InputStateManager} from "./input/InputStateManager.ts";
import {TexturedCurve} from "./service/CurveAlgorithms/TexturedCurve.ts";
import {TextureManager} from "./service/TextureManager.ts";
import { BookmarkService } from "./service/BookMark.ts";
import { PaperManager } from "./service/PaperManager.ts";

export namespace Continuum_Canvas {
  export let appInstance: Application | null = null;
  export let initPromise: Promise<Application> | null = null;

  export let viewportManager: CanvasViewport;
  export const commandManage = new Continuum_CommandManager();
  export const inputStateManager = new InputStateManager();
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
  export const curveGenerator = new TexturedCurve();
  export const textureManager = new TextureManager();
  export const paperManager = new PaperManager();

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
      preference: 'webgpu',
      background: colorPalette.getColor(useBackgroundStore.getState().fillColorId),
    });

    Continuum_Canvas.appInstance = app;
    Continuum_Canvas.viewportManager = new CanvasViewport();
    Continuum_Canvas.backgroundService.init();
    if (Continuum_Canvas.viewportManager.viewport) {
      app.stage.addChild(Continuum_Canvas.viewportManager.viewport);
      app.stage.addChild(Continuum_Canvas.cursorManager.cursorGraphic);
    }

    Continuum_Canvas.cursorManager.updateCursorGraphics();
    Continuum_Canvas.inputStateManager.subscribeEvents();
    Continuum_Canvas.inputStateManager.subscribeShortcuts();
    Continuum_Canvas.textureManager.addDefaultTextures();
    Continuum_Canvas.resizeService.handleResize();
    return app;
  }

  export function setUpAdditionalData(){
    inputStateManager.setUpRect();
  }

  export function IsCanvasReady() {
    return (
      Continuum_Canvas.appInstance && Continuum_Canvas.appInstance.renderer
    );
  }
}
