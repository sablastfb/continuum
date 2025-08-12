import { CanvasPalet } from "../../data/container/PaletContainer";
import useCanvasStore from "../../data/store/CanvasStore";
import { ColorId } from "../../data/types/CanvasTypes";

export type CircleColorPickerParm = {
  colorId: ColorId;
  selected: boolean;
};

function CircleColorPicker({ colorId, selected }: CircleColorPickerParm) {
  const setPencileColor = useCanvasStore((state) => state.setPencileColor);

  return (
    <div
      onClick={() => {
        setPencileColor({ colorId: colorId, color: "" });
      }}
      style={{ backgroundColor: CanvasPalet.GetColor(colorId) }}
      className={`hover:cursor-pointer rounded-full w-7 h-7 ${ selected ? "outline-4 " : "" } `}
    ></div>
  );
}

export default CircleColorPicker;
