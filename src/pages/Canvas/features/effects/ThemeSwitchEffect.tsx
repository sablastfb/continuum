import { useEffect } from "react";
import useCanvasStore from "../../data/store/CanvasStore";
import { CanvasBacground } from "../service/Background";

function ThemeSwitchEffect() {
    const theme = useCanvasStore((state) => state.canvasSettings.theme);

    useEffect(() => {
       CanvasBacground.WihtBacground();
    }, [theme])


  return <></>;
}

export default ThemeSwitchEffect;
