import CircleColorPicker from "../../../components/misc/CircleColorPicker";
import CircleThicknesPicker from "../../../components/misc/CircleThicknesPicker";
import ArrayDivider from "../../../components/misc/ArrayDivider";
import useCanvasStore from "../../../data/CanvasStore";

function PencileTools() {
  const pencileSettings = useCanvasStore();
  return (
    <>
      <div className="absolute right-0 h-full flex justify-center items-center pr-2 pointer-events-none">
        <div className="flex flex-col justify-center items-center gap-4  bg-white/10 backdrop-blur-sm rounded-lg p-1  min-w-min pointer-events-auto">

          {pencileSettings.canvasSettings.pencile.thicknes.map((color, ix) => {
            return <CircleThicknesPicker thicknes={color} selected={false} key={ix} />;
          })}

          <ArrayDivider orjentation="horizontal" />
          {pencileSettings.canvasSettings.pencile.colors.map((color, ix) => {
            return <CircleColorPicker color={color} colorKey={ix} key={ix} />;
          })}
        </div>
      </div>
    </>
  );
}

export default PencileTools;
