import { defaultOutlineColor } from "../../data/constants/CanvasConstants";
import { CanvasPalet, ColorId } from "../../data/container/PaletContainer";

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
      style={{ backgroundColor: CanvasPalet.getColor(colorId) }}
      className={`rounded-full w-7 h-7 hover:cursor-pointer ${
        selected ? defaultOutlineColor : ""
      } `}
    ></div>
  );
}

export default CircleColorPicker;
