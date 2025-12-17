import { useEffect } from "react";
import useBackgroundStore from "../../data/store/BackgroundStore.ts";
import useToolStore from "../../data/store/ToolStore";
import { Continuum_Canvas } from "../../features/CanvasApp";

const BackgroundEffect = () => {
  const backgroundSettings = useBackgroundStore((state) => state);
  const mainAxes = useBackgroundStore((state) => state).mainAxisVisible;
  const activeTool = useToolStore().activeTool;

  useEffect(() => {
    Continuum_Canvas.backgroundService.updateBackground(backgroundSettings);
  }, [backgroundSettings]);

  useEffect(() => {
    Continuum_Canvas.backgroundShaderService.updateMainAxes(mainAxes);
  }, [mainAxes]);

  useEffect(() => {
    Continuum_Canvas.toolManager.setTool(activeTool);
    Continuum_Canvas.cursorManager.updateCursorGraphics();
  }, [activeTool]);

  useEffect(() => {}, [])
  return <></>;
};

export default BackgroundEffect;
