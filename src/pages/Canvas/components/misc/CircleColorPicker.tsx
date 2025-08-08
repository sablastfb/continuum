import useCanvasStore from "../../data/CanvasStore";

export type CircleColorPickerParm = {
  color: string;
  colorKey: number;
};

function CircleColorPicker({ color, colorKey }: CircleColorPickerParm) {
  const setPencileColor = useCanvasStore((state) => state.setPencileColor);
  const activeColorKey = useCanvasStore((state) => state.activeColorKey);

  return (
    <div
      onClick={() => {
        setPencileColor({ color: color, activeColorKey: colorKey });
      }}
      style={{ backgroundColor: color }}
      className={`hover:cursor-pointer rounded-full w-7 h-7 ${
        activeColorKey === colorKey ? "ring-2 ring-offset-2 ring-gray-400" : ""
      }`}
    ></div>
  );
}

export default CircleColorPicker;
