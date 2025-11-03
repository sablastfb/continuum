import { Checkbox } from "primereact/checkbox";
import useBacgroundStore from "../../../data/store/BacgroundStore";
import { Continuum_Canvas } from "../../../features/CanvasApp";
import PatternPicker from "../../pickers/PatternPicker/PatternPicker";
import { PatternType } from "../../../data/types/PatternTypes";

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
            backgroundColor={Continuum_Canvas.colorPalet.getColor(
              background.fillColorId
            )}
            gridColor={Continuum_Canvas.colorPalet.getColor(
              background.grid.gridBorderColor
            )}
            dotColor={Continuum_Canvas.colorPalet.getColor(
              background.dots.dotColor
            )}
            lineColor={Continuum_Canvas.colorPalet.getColor(
              background.line.lineColor
            )}
            onPatternSelect={handlePatternSelect}
          />
        </div>
        <div className="flex align-items-center">
          <Checkbox
            inputId="ingredient1"
            name="pizza"
            value="Cheese"
            onChange={() => {
              setBackgroundSettings({
                mainAxisVisible: !background.mainAxisVisible,
              });
            }}
            checked={background.mainAxisVisible}
          />
          <label htmlFor="ingredient1" className="ml-2">
            Main axses
          </label>
        </div>
        {background.mainAxisVisible}
      </div>
    </div>
  );
};

export default BackgroundSettings;
