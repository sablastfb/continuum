import { useEffect } from "react";
import useCanvasStore from "../../data/CanvasStore";
import { Canvas } from "../CanvasApp";

function Background() {
  const backgroundSetting = useCanvasStore(
    (state) => state.canvasSettings.background
  );

  useEffect(() => {
    Canvas.changeBackground(backgroundSetting.color);
  }, [backgroundSetting]);
  return <></>;
}

export default Background;
