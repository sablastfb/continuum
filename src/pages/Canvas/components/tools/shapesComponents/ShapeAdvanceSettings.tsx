import { useState } from "react";
import { Slider, SliderChangeEvent } from "primereact/slider";
import { useShapesStore } from "../../../data/store/ShapeStore";

const ShapeAdvanceSettings = () => {
  const shapeStore = useShapesStore();

  return (
    <div className="p-4 flex flex-col gap-4 rounded-lg">
      <h3 className="text-lg font-semibold  mb-2">Shape Settings</h3>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium ">Stroke Width</label>
          <span className="text-sm  font-mono">{shapeStore.stroke}px</span>
        </div>
        <Slider
          value={shapeStore.stroke}
          onChange={(e: SliderChangeEvent) => shapeStore.updateShape({stroke:e.value as number})}
          className="w-full"
          min={0}
          max={20}
          step={1}
        />
      </div>

      {/* Rounded Control */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">
            Corner Radius
          </label>
          <span className="text-sm font-mono">{shapeStore.cornerRadius}px</span>
        </div>
        <Slider
          value={shapeStore.cornerRadius}
          onChange={(e: SliderChangeEvent) => shapeStore.updateShape({cornerRadius:e.value as number})}
          className="w-full"
          min={0}
          max={75}
          step={1}
        />
      </div>
 
    </div>
  );
};

export default ShapeAdvanceSettings;
