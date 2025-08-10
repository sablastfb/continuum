import { useEffect } from "react";
import useCanvasStore from "../../data/CanvasStore";
import { CanvasBacground } from "../service/Background";

function BackgroundEffect() {
  const backgroundSetting = useCanvasStore(
    (state) => state.canvasSettings.background
  );

  useEffect(() => {
    CanvasBacground.changeBackground(backgroundSetting);
  }, [backgroundSetting]);
  return <></>;
}

export default BackgroundEffect;
