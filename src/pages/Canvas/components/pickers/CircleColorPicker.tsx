import { ColorId } from "../../data/palet/PaletContainer";
import { Continuum_Canvas } from "../../features/CanvasApp";

export type CircleColorPickerParm = {
  colorId: ColorId;
  selected: boolean;
  action: () => void;
  variant?: "fill" | "stroek";
};

const CircleColorPicker = ({
  colorId,
  selected,
  action,
  variant = "fill",
}: CircleColorPickerParm) => {
  const color = Continuum_Canvas.colorPalet.getColor(colorId);

  return (
    <div
      onClick={action}
      className={`rounded-full p-0.5  ${
        selected ? "ring-4 ring-amber-400" : ""
      }`}
    >
      <div
        style={
          variant === "fill"
            ? {
                backgroundColor: color,
              }
            : {
                backgroundColor: "transparent",
                border: `4px solid ${color}`,
              }
        }
        className="rounded-full w-7 h-7 hover:cursor-pointer select-none"
      ></div>
    </div>
  );
};

export default CircleColorPicker;
