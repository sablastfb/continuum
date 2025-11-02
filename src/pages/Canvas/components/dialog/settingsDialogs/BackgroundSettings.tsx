import useBacgroundStore from "../../../data/store/BacgroundStore";
import { Continuum_Canvas } from "../../../features/CanvasApp";
import PatternPicker, { PatternType } from "../../pickers/PatternPicker/PatternPicker";

const BackgroundSettings = () => {
  const setBackgroundSettings = useBacgroundStore().setBackgroundSettings;
  const background = useBacgroundStore();

  const handlePatternSelect = (pattern: PatternType) => {
    setBackgroundSettings({ activeBacgroundType: pattern });
  };

  return (
    <div className="p-4">
      <h3 className="text-2xl mb-4">Background Settings</h3>
      <div className="flex gap-4 flex-col">
        <div className="flex flex-col gap-4">
          <div className="text-xl">Background type</div>
          <PatternPicker
            selectedPattern={background.activeBacgroundType}
            backgroundColor={Continuum_Canvas.colorPalet.getColor(background.fillColorId)}
            gridColor={Continuum_Canvas.colorPalet.getColor(background.grid.gridBorderColor)}
            dotColor={Continuum_Canvas.colorPalet.getColor(background.dots.dotColor)}
            lineColor={Continuum_Canvas.colorPalet.getColor(background.line.lineColor)}
            onPatternSelect={handlePatternSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundSettings;