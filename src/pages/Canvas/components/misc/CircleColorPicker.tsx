import { useEffect } from "react";
import { CanvasPalet } from "../../data/container/PaletContainer";
import useCanvasStore from "../../data/store/CanvasStore";
import { ColorId } from "../../data/types/CanvasTypes";

export type CircleColorPickerParm = {
  color: ColorId;
  colorKey: number;
};

function CircleColorPicker({ color, colorKey }: CircleColorPickerParm) {
  const setPencileColor = useCanvasStore((state) => state.setPencileColor);
  const activeColorKey = useCanvasStore((state) => state.activeColorKey);

  useEffect(()=>{
    debugger;
  },[])

  return (
    <div
      onClick={() => {
        setPencileColor({ color:  color, activeColorKey: colorKey });
      }}
      style={{ backgroundColor: CanvasPalet.GetColor(color) }}
      className={`hover:cursor-pointer rounded-full w-7 h-7 `}
    ></div>
  );
}

export default CircleColorPicker;
