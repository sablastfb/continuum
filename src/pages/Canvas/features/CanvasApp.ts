import { Application } from "pixi.js";
import { ToolManager } from "./tools/ToolManager";
import { ColorPalet } from "../data/palet/PaletContainer";
import useBacgroundStore from "../data/store/BacgroundStore";
import { ResizeService } from "./service/Resize";
import { CursorManager } from "./cursor/CursorManager";
import { CanvasViewport as CanvasViewport } from "./service/Viewport";
import { Continuum_CommandManager } from "./commands/CommandManager";
import { Continuum_CurveService } from "./service/CurveService";
import { InputStateManager } from "./input/InputState";
import { InputBidings } from "./input/InputBiding";
import { BookmarkService } from "./service/BookMark";
import { ThicknesPalet } from "../data/thicknes/ThickneContainer";
import { BacgroundService } from "./service/Bacgroun";
import { ShapeShaderService } from "./service/Shader/ShapeShaderService";
import { BacgroundShaderService } from "./service/Shader/BacgroundShaderService";
import { MeshManager } from "./service/MeshCreator";

export namespace Continuum_Canvas {
  export let appInstance: Application | null = null;
  export let initPromise: Promise<Application> | null = null;

  export let viewportManager: CanvasViewport;
  export const commandManage = new Continuum_CommandManager();
  export const inputStateManager = new InputStateManager();
  export const inputBidings = new InputBidings();
  export const cursorManager = new CursorManager();
  export const toolManager = new ToolManager();
  export const resizeService = new ResizeService();
  export const bookMarkService = new BookmarkService();
  export const colorPalet = new ColorPalet();
  export const thicknesPalet = new ThicknesPalet();
  export const shapeShaderService = new ShapeShaderService();
  export const bacgroundService = new BacgroundService();
  export const bacgroundShaderService = new BacgroundShaderService();
  export const meshCreator = new MeshManager();

  export async function creatPixiApp() {
    if (appInstance) {
      return appInstance;
    }
    if (initPromise) {
      return initPromise;
    }

    initPromise = setUpAplication();
    appInstance = await initPromise;
    return appInstance;
  }

  async function setUpAplication(): Promise<Application> {
    const app = new Application();
    await app.init({
      autoDensity: true,
      antialias: true,
      resolution: window.devicePixelRatio || 1,

      background: colorPalet.getColor(useBacgroundStore.getState().fillColorId),
    });

    Continuum_Canvas.appInstance = app;
    Continuum_Canvas.viewportManager = new CanvasViewport();
    Continuum_CurveService.init();
    Continuum_Canvas.bacgroundService.init();
    if (Continuum_Canvas.viewportManager.viewport) {
      app.stage.addChild(Continuum_Canvas.viewportManager.viewport);
      app.stage.addChild(Continuum_Canvas.cursorManager.cursor);
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
