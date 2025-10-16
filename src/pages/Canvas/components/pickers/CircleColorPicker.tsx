import { DefaultOutline, DefaultOutlineColor } from "../../data/constants/CanvasConstants";
import { Continuum_CanvasPalet, ColorId } from "../../data/palet/PaletContainer";

export type CircleColorPickerParm = {
  colorId: ColorId;
  selected: boolean;
  action: () => void;
};

function CircleColorPicker({
  colorId,
  selected,
  action,
}: CircleColorPickerParm) {
  return (
    <div
      onClick={() => {
        action();
      }}
      style={{ backgroundColor: Continuum_CanvasPalet.getColor(colorId) }}
      className={`rounded-full w-7 h-7 hover:cursor-pointer ${
        selected ? DefaultOutlineColor : ""
      } `}
    ></div>
  );
}

export default CircleColorPicker;
