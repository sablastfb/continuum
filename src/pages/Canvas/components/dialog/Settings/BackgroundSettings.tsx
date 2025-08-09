import { ColorPicker } from "primereact/colorpicker";
import { Canvas } from "../../../features/CanvasApp";
import { useState } from "react";

function BackgroundSettings() {
  const [color, setColor] = useState<string>("red");

  return (
    <div className="p-4">
      <h3 className="text-xl text-white mb-4">Background Settings</h3>
      <ColorPicker
        value={color}
        onChange={(e) => {
          Canvas.changeBackground(e.value as string);
        }}
        format="hex"
      />
    </div>
  );
}

export default BackgroundSettings;
