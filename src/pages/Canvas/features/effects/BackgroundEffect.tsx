import { useEffect } from "react";
import { CanvasBacground } from "../service/Background";
import useSettingsStore from "../../data/store/SettingsStore";

function BackgroundEffect() {
  const backgroundSetting = useSettingsStore(
    (state) => state.background
  );
  const theme = useSettingsStore(
    (state) => state.theme
  );

  useEffect(() => {
    debugger;
    CanvasBacground.changeBackground(backgroundSetting);
  }, [backgroundSetting, theme]);
  return <></>;
}

export default BackgroundEffect;
