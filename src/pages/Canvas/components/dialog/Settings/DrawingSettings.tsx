import { useState } from "react";
import CircleColorPicker from "../../misc/CircleColorPicker";
import { ColorId } from "../../../data/types/CanvasTypes";
import useSettingsStore from "../../../data/store/SettingsStore";

function DrawingSettings() {
  const pencileSettings = useSettingsStore().pencile;
  const addColor = useSettingsStore().addColor;
  const [color, setColor] = useState<ColorId>("bg-1");

  return (
    <div className="p-4">
      <h3 className="text-xl mb-4">Pencil Settings</h3>
      <div className="flex gap-4">
        {pencileSettings.colors.map((color, ix) => {
          return (
            <CircleColorPicker colorId={color} selected={false} key={ix} />
          );
        })}
        {/* <ColorPicker
              value={color}
              onChange={(e) => {
                setColor(e.value as string);
              }}
              format="hex"
            />
            <Button onClick={()=>{
              addColor(`#${color}`);
            }}/> */}
      </div>
    </div>
  );
}

export default DrawingSettings;
