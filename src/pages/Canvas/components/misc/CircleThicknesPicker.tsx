import useCanvasStore from "../../data/CanvasStore";

export type CircleThicknesPickerParm = {
  thicknes: number;
  selected: boolean;
};

function CircleThicknesPicker({ thicknes, selected }: CircleThicknesPickerParm) {
  const setPencileThickens = useCanvasStore((state) => state.setPencileThickens);

  return (
    <div
        onClick={() => {
            setPencileThickens(thicknes);
        }}
      style={{ width: thicknes, height: thicknes }}
     className={`hover:cursor-pointer bg-amber-100 rounded-full w-7 h-7 ${selected ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}    ></div>
  );
}

export default CircleThicknesPicker;
