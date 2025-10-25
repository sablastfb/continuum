import { useEffect } from "react";
import { Continuum_CanvasBacground } from "../../features/service/Background";
import useSettingsStore from "../../data/store/BacgroundStore";
import { Continuum_CanvasCursor } from "../../features/cursor/CursorManager";
import { Continuum_ToolManager } from "../../features/tools/ToolManager";
import useToolStore from "../../data/store/ToolStore";

const BackgroundEffect = () => {
  const settings = useSettingsStore(
    (state) => state
  );

  const activeTool = useToolStore().activeTool;

  useEffect(() => {
    Continuum_CanvasBacground.changeBackground(settings.background);
  }, [settings]);


  useEffect(() =>{
    Continuum_ToolManager.setTool(activeTool);
    Continuum_CanvasCursor.updateCursor();
  }, [activeTool]);
  return <></>;
}

export default BackgroundEffect;
