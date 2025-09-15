import { useEffect } from "react";
import { CanvasBacground } from "../../features/service/Background";
import useSettingsStore from "../../data/store/SettingsStore";
import { Canvas } from "../../features/CanvasApp";
import useCanvasStore from "../../data/store/CanvasStore";
import { CanvasCursor } from "../../features/service/Cursor";
import { Continuum } from "../../features/tools/ToolManager";

function BackgroundEffect() {
  const settings = useSettingsStore(
    (state) => state
  );

  const activeTool = useCanvasStore().activeTool;

  useEffect(() => {
    CanvasBacground.changeBackground(settings.background);
  }, [settings]);


  useEffect(() =>{
    debugger;
    Continuum.ToolManager.setTool(activeTool);
    CanvasCursor.updateCursor();
  }, [activeTool]);
  return <></>;
}

export default BackgroundEffect;
