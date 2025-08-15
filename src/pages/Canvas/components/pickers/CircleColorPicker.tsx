import { defaultOutlineColor } from "../../data/constants/CanvasConstants";
import { CanvasPalet } from "../../data/container/PaletContainer";
import { usePencileStore } from "../../data/store/PencileStore";
import { ColorId } from "../../data/types/CanvasTypes";

export type CircleColorPickerParm = {
  colorId: ColorId;
  selected: boolean;
};

function CircleColorPicker({ colorId, selected }: CircleColorPickerParm) {
  const setPencileColor = usePencileStore((state) => state.setPencileColor);

  return (
    <div
      onClick={() => {
        setPencileColor({ colorId: colorId, color: "" });
      }}
      style={{ backgroundColor: CanvasPalet.getColor(colorId) }}
      className={`hover:cursor-pointer rounded-full w-7 h-7 ${ selected ? defaultOutlineColor : "" } `}
    ></div>
  );
}

export default CircleColorPicker;
