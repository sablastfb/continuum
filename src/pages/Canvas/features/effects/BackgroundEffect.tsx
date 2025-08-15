import { useEffect } from "react";
import { CanvasBacground } from "../service/Background";
import useSettingsStore from "../../data/store/SettingsStore";

function BackgroundEffect() {
  const settings = useSettingsStore(
    (state) => state
  );
  const theme = useSettingsStore(
    (state) => state
  );

  useEffect(() => {
    debugger;
    CanvasBacground.changeBackground(settings.background);
  }, [settings, theme]);
  return <></>;
}

export default BackgroundEffect;
