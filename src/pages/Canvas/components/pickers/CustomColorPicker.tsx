import { useState } from "react";
import { CanvasPalet } from "../../data/container/PaletContainer";
import { usePencileStore } from "../../data/store/PencileStore";

function CustomColorPicker({ customColorId }: { customColorId: string }) {
  const setPencileColor = usePencileStore().setPencileColor;
  const pencilColorId = usePencileStore().pencilColorId;

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
    CanvasPalet.setColor(customColorId, rgbString);
    setPencileColor({ colorId: customColorId, color: rgbString });
  };

  return (
    <div
      style={{ background: color }}
      className={`rounded-sm ${
        pencilColorId === customColorId ? "outline-4" : ""
      }`}
    >
      <input
        type="color"
        className={`rounded-xl w-8 h-8 cursor-pointer opacity-0  `}
        value={color}
        onDoubleClick={(e) => {
          e.preventDefault();
          debugger;
          const rgbObj = hexToRgb(color);
          CanvasPalet.setColor(
            customColorId,
            `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`
          );
          setPencileColor({
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
