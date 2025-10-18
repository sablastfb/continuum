import { useState } from "react";
import { Continuum_CanvasPalet } from "../../data/palet/PaletContainer";
import { usePenStore } from "../../data/store/PenStore";
import { CirclePickeSize, DefaultOutline } from "../../data/types/CanvasConstants";

function CustomColorPicker({ customColorId }: { customColorId: string }) {
  const setPenColor = usePenStore().setPenColor;
  const pencilColorId = usePenStore().penColorId;

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
    Continuum_CanvasPalet.setColor(customColorId, rgbString);
    setPenColor({ colorId: customColorId, color: rgbString });
  };

  return (
    <div
      style={{ background: color }}
      className={`rounded-sm ${
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
          Continuum_CanvasPalet.setColor(
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
