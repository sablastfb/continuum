import { DefaultOutlineColor } from "../../data/constants/CanvasConstants";
import { ColorId } from "../../data/palet/PaletContainer";
import { Continuum_Canvas } from "../../features/CanvasApp";

export type CircleColorPickerParm = {
  colorId: ColorId;
  selected: boolean;
  action: () => void;
};

const CircleColorPicker = ({
  colorId,
  selected,
  action,
}: CircleColorPickerParm) => {
  return (
    <div>

    <div
      onClick={() => {
        action();
      }}
      style={{ backgroundColor: Continuum_Canvas.colorPalet.getColor(colorId) }}
      className={`rounded-full w-7 h-7 hover:cursor-pointer ${
        selected ? DefaultOutlineColor : ""
      } `}
      ></div>
      </div>
  );
}

export default CircleColorPicker;
