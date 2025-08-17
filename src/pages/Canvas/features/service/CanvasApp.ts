import { Viewport } from "pixi-viewport";
import { Application, Assets, Geometry, Graphics, Mesh, Shader, Sprite, Texture } from "pixi.js";
import { ToolsManager, ToolType } from "../tools/ToolManager";
import { CanvasBacground } from "./Background";
import { CanvasPalet } from "../../data/container/PaletContainer";
import useSettingsStore from "../../data/store/SettingsStore";
import { CanvasResize } from "./Resize";
import { CanvasCursor } from "./Cursor";
import { CanvasViewport } from "./Viewport";

import vertex from './sharedShader.vert?raw';
import fragment from './sharedShader.frag?raw';
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

    appInstance!.stage.addChild(CanvasViewport.viewport);
    appInstance!.stage.addChild(CanvasCursor.cursor);

    toolsManager = new ToolsManager();

    ////////////// SHADER TEST
    const quadGeometry = new Geometry({
      attributes: {
        aPosition: [
          -100,
          -100, // x, y
          100,
          -100, // x, y
          100,
          100, // x, y,
          -100,
          100, // x, y,
        ],
        aUV: [0, 0, 1, 0, 1, 1, 0, 1],
      },
      indexBuffer: [0, 1, 2, 0, 2, 3],
    });

    const shader = Shader.from({
      gl: {
        vertex,
        fragment,
      },
      resources: {
        uTexture: (await Assets.load('https://pixijs.com/assets/bg_rotate.jpg')).source,
      },
    });
  
    const quad = new Mesh({
      geometry: quadGeometry,
      shader,
    });
    quad.position.set(400, 300);

    appInstance.stage.addChild(quad);
  }

  export function changeTool(toolType: ToolType) {
    if (!toolsManager) return;
    toolsManager?.setTool(toolType);
  }
}
