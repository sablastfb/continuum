import { useEffect } from "react";
import { CanvasBacground } from "../../features/service/Background";
import useSettingsStore from "../../data/store/SettingsStore";
import { Canvas } from "../../features/service/CanvasApp";
import useCanvasStore from "../../data/store/CanvasStore";
import { CanvasCursor } from "../../features/service/Cursor";

function BackgroundEffect() {
  const settings = useSettingsStore(
    (state) => state
  );

  const activeTool = useCanvasStore().activeTool;

  useEffect(() => {
    CanvasBacground.changeBackground(settings.background);
  }, [settings]);


  useEffect(() =>{
    Canvas.changeTool(activeTool);
    CanvasCursor.updateCursor();
  }, [activeTool]);
  return <></>;
}

export default BackgroundEffect;
