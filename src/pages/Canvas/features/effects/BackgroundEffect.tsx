import { useEffect } from "react";
import { CanvasBacground } from "../service/Background";
import useCanvasStore from "../../data/store/CanvasStore";

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
