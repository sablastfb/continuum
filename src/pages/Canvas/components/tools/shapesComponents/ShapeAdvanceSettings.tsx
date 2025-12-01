import { Slider, SliderChangeEvent } from "primereact/slider";
import { Minus, Plus } from "lucide-react";
import { useShapesStore } from "../../../data/store/ShapeStore";
import PatternPicker, { PatternType } from "../../pickers/PatternPicker/PatternPicker";
import { Continuum_Canvas } from "../../../features/CanvasApp";

const StrokeSlider = () => {
  const shapeStore = useShapesStore();
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium ">Stroke Width</label>
          <span className="text-sm  font-mono">{shapeStore.stroke}px</span>
        </div>
        <Slider
          value={shapeStore.stroke}
          onChange={(e: SliderChangeEvent) =>
            shapeStore.updateShape({ stroke: e.value as number })
          }
          className="w-full"
          min={0}
          max={20}
          step={1}
        />
      </div>
    </>
  );
};

const RoundedCorner = () => {
  const shapeStore = useShapesStore();

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Corner Radius</label>
          <span className="text-sm font-mono">{shapeStore.cornerRadius}px</span>
        </div>
        <Slider
          value={shapeStore.cornerRadius}
          onChange={(e: SliderChangeEvent) =>
            shapeStore.updateShape({ cornerRadius: e.value as number })
          }
          className="w-full"
          min={0}
          max={75}
          step={1}
        />
      </div>
    </>
  );
};

const NumberOfSidesPicker = () => {
  const shapeStore = useShapesStore();
  
  const handleIncrement = () => {
    shapeStore.updateShape({
      numberOfCorners: shapeStore.numberOfCorners + 1,
    });
  };

  const handleDecrement = () => {
    if (shapeStore.numberOfCorners > 3) {
      shapeStore.updateShape({
        numberOfCorners: shapeStore.numberOfCorners - 1,
      });
    }
  };

  const isMinValue = shapeStore.numberOfCorners <= 3;

  return (
    <div >
      <label className="text-sm font-medium">
        Number of sides
      </label>
      
      <div className="flex items-center justify-between w-50 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg ">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={isMinValue}
          className={`
            cursor-pointer
            flex items-center justify-center w-6 h-6 rounded-lg transition-all duration-200
            ${isMinValue 
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95'
            }
          `}
          aria-label="Decrease number of sides"
        >
          <Minus className="w-5 h-5" />
        </button>
        
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {shapeStore.numberOfCorners}
          </span>
        </div>
        
        <button
          type="button"
          onClick={handleIncrement}
          className="flex items-center justify-center w-6 h-6  rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 active:scale-95"
          aria-label="Increase number of sides"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const SquareSettings = () => {
  return (
    <>
      <StrokeSlider />
      <RoundedCorner />
    </>
  );
};

const CircleSettings = () => {
  return (
    <>
      <StrokeSlider />
    </>
  );
};

const PoligonSettings = () => {
  return (
    <>
      <NumberOfSidesPicker />
      <StrokeSlider />
      <RoundedCorner />
    </>
  );
};

const ShapeAdvanceSettings = () => {
  const shapeStore = useShapesStore();
  const handlePatternSelect = (pattern: PatternType) => {
    shapeStore.updateShape({ activeBacgroundType: pattern });
  };


  return (
    <div className="p-4 flex flex-col gap-4 rounded-lg">
      <h3 className="text-lg font-semibold  mb-2">Shape Settings</h3>
      {shapeStore.shape === "square" && <SquareSettings />}
      {shapeStore.shape === "circle" && <CircleSettings />}
      {shapeStore.shape === "poligon" && <PoligonSettings />}
         <PatternPicker
            selectedPattern={shapeStore.activeBacgroundType}
            backgroundColor={Continuum_Canvas.colorPalet.getColor(shapeStore.fillColorId)}
            gridColor={Continuum_Canvas.colorPalet.getColor(shapeStore.grid.gridBorderColor)}
            dotColor={Continuum_Canvas.colorPalet.getColor(shapeStore.dots.dotColor)}
            lineColor={Continuum_Canvas.colorPalet.getColor(shapeStore.line.lineColor)}
            onPatternSelect={handlePatternSelect}
          />
    </div>
  );
};

export default ShapeAdvanceSettings;
