import { useEffect } from "react";
import useCanvasStore from "../../data/CanvasStore";
import { CanvasBacground } from "../service/background";

function Background() {
  const backgroundSetting = useCanvasStore(
    (state) => state.canvasSettings.background
  );

  useEffect(() => {
    CanvasBacground.changeBackground(backgroundSetting);
  }, [backgroundSetting]);
  return <></>;
}

export default Background;
