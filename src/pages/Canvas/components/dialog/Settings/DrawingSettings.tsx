import { useState } from "react";
import useCanvasStore, { usePencileSettings } from "../../../data/CanvasStore";
import CircleColorPicker from "../../misc/CircleColorPicker";
import { ColorPicker } from "primereact/colorpicker";
import { Button } from "primereact/button";

function DrawingSettings() {
  const pencileSettings = usePencileSettings();
  const addColor = useCanvasStore().addColor;
  const [color, setColor] = useState<string>("red");

  return (
    <div className="p-4">
      <h3 className="text-xl text-white mb-4">Pencil Settings</h3>
      <div className="flex gap-4">
      {pencileSettings.colors.map((color, ix) => {
        return <CircleColorPicker color={color} colorKey={ix} key={ix} />;
      })}
       <ColorPicker
              value={color}
              onChange={(e) => {
                setColor(e.value as string);
              }}
              format="hex"
            />
            <Button onClick={()=>{
              addColor(`#${color}`);
            }}/>
      </div>

    </div>
  );
}

export default DrawingSettings;
