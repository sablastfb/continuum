import CircleColorPicker from "../misc/CircleColorPicker";
import CircleThicknesPicker from "../misc/CircleThicknesPicker";
import ArrayDivider from "../misc/ArrayDivider";
import useCanvasStore from "../../data/store/CanvasStore";
import { ColorPicker, ColorPickerRGBType } from "primereact/colorpicker";
import { useState } from "react";
import { CanvasPalet } from "../../data/container/PaletContainer";

function CustomColorPicker() {
  const setPencileColor = useCanvasStore().setPencileColor;
  const [color, setColor] = useState<ColorPickerRGBType>({
    r: 100,
    g: 102,
    b: 241,
  });

  const setColorUp = (color: ColorPickerRGBType) => {
    const rbg = `rgb(${color.r}, ${color.g}, ${color.b})`;
    setColor(color);
    CanvasPalet.setColor("1", rbg);
    setPencileColor({ colorId: "1", color: rbg });
  };

  return (
    <ColorPicker
      format="rgb"
      value={color}
      onChange={(e) => setColorUp(e.value as ColorPickerRGBType)}
    />
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
