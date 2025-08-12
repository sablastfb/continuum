import CircleColorPicker from "../misc/CircleColorPicker";
import CircleThicknesPicker from "../misc/CircleThicknesPicker";
import ArrayDivider from "../misc/ArrayDivider";
import useCanvasStore from "../../data/store/CanvasStore";
import { useState } from "react";
import { CanvasPalet } from "../../data/container/PaletContainer";

function CustomColorPicker() {
  const setPencileColor = useCanvasStore().setPencileColor;
  const pencilColorId = useCanvasStore().pencil.pencilColorId;

  const [color, setColor] = useState<string>("#6466f1"); // equivalent to rgb(100, 102, 241)

  // Helper function to convert hex to RGB object
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
        onDoubleClick={() => {
          const rgbObj = hexToRgb(color);
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

function PencileTools() {
  const pencileSettings = useCanvasStore();
  const pencilColor = useCanvasStore().pencil.pencilColorId;

  return (
    <>
      <div className="absolute right-0 h-full flex justify-center items-center pr-2 pointer-events-none">
        <div className="flex flex-col justify-center items-center gap-4  bg-white/10 backdrop-blur-sm rounded-lg p-1  min-w-min pointer-events-auto">
          {pencileSettings.canvasSettings.pencile.thicknes.map((color, ix) => {
            return (
              <CircleThicknesPicker
                thicknes={color}
                selected={false}
                key={ix}
              />
            );
          })}

          <ArrayDivider orjentation="horizontal" />
          {pencileSettings.canvasSettings.pencile.colors.map((colorId, ix) => {
            return (
              <CircleColorPicker
                colorId={colorId}
                key={ix}
                selected={colorId === pencilColor}
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
