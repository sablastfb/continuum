import { Viewport } from "pixi-viewport";
import { Application, Assets, Filter, Geometry, GlProgram, Graphics, Mesh, Shader, Sprite, Texture } from "pixi.js";
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
    // const quadGeometry = new Geometry({
    //   attributes: {
    //     aPosition: [-100, -50, 100, -50, 0, 100],
    //     aColor: [1, 0, 0, 0, 1, 0, 0, 0, 1],
    //   },
    // });



  //   const uniforms = {
  //     uZoom: 1.0,
  //     uPan: [0.0, 0.0],
  //     uTime: 0.0,
  //     // Add any other uniforms you need
  // };

  //   const shader = Shader.from({
  //     gl: {
  //       vertex,
  //       fragment,
  //     },
  //     resources: {
  //       ...uniforms
  //     }
  //   });

  const uniforms = {
    uZoom: 1.0,
    uPan: [0.0, 0.0],
    uTime: 0.0,
    // Add any other uniforms you need
};
    const square = new Graphics().rect(0,0, 500, 500)
    .fill("white");
    const myFilter = new Filter({
      glProgram: new GlProgram({
        fragment,
        vertex,
      }),
      resources: {
        timeUniforms: {
          uTime: { value: 0.0, type: 'f32' },
        },
      },
    });
    
    square.filters = [myFilter];
    square.position.set(0, 0);

    appInstance.stage.addChild(square);

    appInstance.ticker.add((ticker) => {
      myFilter.resources.timeUniforms.uniforms.uTime += 0.04 * ticker.deltaTime;
    });
  }

  export function changeTool(toolType: ToolType) {
    if (!toolsManager) return;
    toolsManager?.setTool(toolType);
  }
}
