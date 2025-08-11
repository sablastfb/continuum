import { useEffect } from "react";
import { CanvasBacground } from "../service/Background";
import useCanvasStore from "../../data/store/CanvasStore";

function BackgroundEffect() {
  const backgroundSetting = useCanvasStore(
    (state) => state.canvasSettings.background
  );
  const theme = useCanvasStore(
    (state) => state.canvasSettings.theme
  );

  useEffect(() => {
    CanvasBacground.changeBackground(backgroundSetting);
  }, [backgroundSetting, theme]);
  return <></>;
}

export default BackgroundEffect;
