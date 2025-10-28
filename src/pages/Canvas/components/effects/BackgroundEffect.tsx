import { useEffect } from "react";
import useSettingsStore from "../../data/store/BacgroundStore";
import useToolStore from "../../data/store/ToolStore";
import { Continuum_Canvas } from "../../features/CanvasApp";

const BackgroundEffect = () => {
  const settings = useSettingsStore((state) => state);

  const activeTool = useToolStore().activeTool;

  useEffect(() => {}, [settings]);

  useEffect(() => {
    Continuum_Canvas.toolManager.setTool(activeTool);
    Continuum_Canvas.cursorManager.updateCursorGraphics();
  }, [activeTool]);
  return <></>;
};

export default BackgroundEffect;
