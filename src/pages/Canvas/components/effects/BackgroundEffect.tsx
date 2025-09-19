import { useEffect } from "react";
import { Continuum_CanvasBacground } from "../../features/service/Background";
import useSettingsStore from "../../data/store/SettingsStore";
import useCanvasStore from "../../data/store/CanvasStore";
import { Continuum_CanvasCursor } from "../../features/service/Cursor";
import { Continuum_ToolManager } from "../../features/tools/ToolManager";

function BackgroundEffect() {
  const settings = useSettingsStore(
    (state) => state
  );

  const activeTool = useCanvasStore().activeTool;

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
