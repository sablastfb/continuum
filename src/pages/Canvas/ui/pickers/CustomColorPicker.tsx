import { useState } from "react";
import { useCurveStore } from "../../data/store/PenStore";
import { CirclePickeSize, DefaultOutline } from "../../data/constants/CanvasConstants";
import { Continuum_Canvas } from "../../features/CanvasApp";

const CustomColorPicker = ({ customColorId }: { customColorId: string }) => {
  const setPenColor = useCurveStore().setPenColor;
  const pencilColorId = useCurveStore().penColorId;

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
    Continuum_Canvas.colorPalet.setColor(customColorId, rgbString);
    setPenColor({ colorId: customColorId, color: rgbString });
  };

  return (
    <div
      style={{ background: color }}
      className={` select-none rounded-sm ${
        pencilColorId === customColorId ? `${DefaultOutline}` : ""
      }`}
    >
      <input
        type="color"
        className={`rounded-xl cursor-pointer opacity-0  ${CirclePickeSize}`}
        value={color}
        onDoubleClick={(e) => {
          e.preventDefault();
          const rgbObj = hexToRgb(color);
          Continuum_Canvas.colorPalet.setColor(
            customColorId,
            `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`
          );
          setPenColor({
            colorId: customColorId,
            color: `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`,
          });
        }}
        onChange={(e) => setColorUp(e.target.value)}
      />
    </div>
  );
}

export default CustomColorPicker;
