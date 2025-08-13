import CircleColorPicker from "../misc/CircleColorPicker";
import CircleThicknesPicker from "../misc/CircleThicknesPicker";
import ArrayDivider from "../misc/ArrayDivider";
import useCanvasStore from "../../data/store/CanvasStore";
import { ChangeEvent, useState } from "react";
import { CanvasPalet } from "../../data/container/PaletContainer";
import { Minus, Plus } from "lucide-react";
import { throttle } from "lodash";

function CustomColorPicker() {
  const setPencileColor = useCanvasStore().setPencileColor;
  const pencilColorId = useCanvasStore().pencil.pencilColorId;

  const [color, setColor] = useState<string>("#6466f1");

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 100, g: 102, b: 241 };
  };

  const setColorUp = (hexColor: string) => {
    const rgbObj = hexToRgb(hexColor);
    const rgbString = `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`;

    setColor(hexColor);
    CanvasPalet.setColor("1", rgbString);
    setPencileColor({ colorId: "1", color: rgbString });
  };

  return (
    <div
      style={{ background: color }}
      className={`rounded-sm ${pencilColorId === "1" ? "outline-4" : ""}`}
    >
      <input
        type="color"
        className={`rounded-xl w-8 h-8 cursor-pointer opacity-0  `}
        value={color}
        onDoubleClick={(e) => {
          e.preventDefault();
          const rgbObj = hexToRgb(color);
          CanvasPalet.setColor(
            "1",
            `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`
          );
          setPencileColor({
            colorId: "1",
            color: `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`,
          });
        }}
        onChange={(e) => setColorUp(e.target.value)}
      />
    </div>
  );
}

function Width() {
  return (
    <>
      <div className="flex justify-center items-center gap-0 outline-4  outline-gray-950  rounded-2xl  m-0 ">
        <div className="h-full w-full hover:cursor-pointer bg-gray-950/50 pt-2 pb-2 pl-0.5 rounded-l-2xl">
          <Minus size={10} />
        </div>
        <div className="pl-1 pr-1 bg-gray-800/50 ">12</div>
        <div className="h-full w-full hover:cursor-pointer bg-gray-950/50 pt-2 pb-2 pr-0.5 pl-0.5 rounded-r-2xl">
          <Plus size={10} />
        </div>
      </div>
    </>
  );
}

function PencileTools() {
  const pencileSettings = useCanvasStore();
  const pencilColorId = useCanvasStore().pencil.pencilColorId;
  const thicknesId = useCanvasStore().pencil.thicknesId;

  return (
    <>
      <div className="absolute right-0 h-full flex justify-center items-center pr-2 pointer-events-none">
        <div className="flex flex-col justify-center items-center gap-4  bg-white/10 backdrop-blur-sm rounded-lg p-1  min-w-min pointer-events-auto">
          {pencileSettings.canvasSettings.pencile.thicknes.map((id, ix) => {
            return (
              <CircleThicknesPicker
                thicknesId={id}
                selected={thicknesId === id}
                key={ix}
              />
            );
          })}
          <Width />
          <ArrayDivider orjentation="horizontal" />
          {pencileSettings.canvasSettings.pencile.colors.map((colorId, ix) => {
            return (
              <CircleColorPicker
                colorId={colorId}
                key={ix}
                selected={colorId === pencilColorId}
              />
            );
          })}
          <CustomColorPicker key="1" />
        </div>
      </div>
    </>
  );
}

export default PencileTools;
