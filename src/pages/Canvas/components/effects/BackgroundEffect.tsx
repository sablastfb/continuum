import { useEffect } from "react";
import useBacgroundStore from "../../data/store/BacgroundStore";
import useToolStore from "../../data/store/ToolStore";
import { Continuum_Canvas } from "../../features/CanvasApp";

const BackgroundEffect = () => {
  const bacgroundSettings = useBacgroundStore((state) => state);
  const activeTool = useToolStore().activeTool;

  useEffect(() => {
    debugger;
    Continuum_Canvas.bacgroundService.updateBacground(bacgroundSettings);
  }, [bacgroundSettings]);

  useEffect(() => {
    Continuum_Canvas.toolManager.setTool(activeTool);
    Continuum_Canvas.cursorManager.updateCursorGraphics();
  }, [activeTool]);

  useEffect(() => {}, [])
  return <></>;
};

export default BackgroundEffect;
