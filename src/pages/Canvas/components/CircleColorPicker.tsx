import useCanvasStore from "../data/CanvasStore";

export type CircleColorPickerParm = {
  color: string;
  selected: boolean;
};

function CircleColorPicker({ color, selected }: CircleColorPickerParm) {
  const setPencileColor = useCanvasStore((state) => state.setPencileColor);

  return (
    <div
        onClick={() => {
            setPencileColor(color);
        }}
      style={{ backgroundColor: color }}
     className={`hover:cursor-pointer rounded-full w-7 h-7 ${selected ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}    ></div>
  );
}

export default CircleColorPicker;
