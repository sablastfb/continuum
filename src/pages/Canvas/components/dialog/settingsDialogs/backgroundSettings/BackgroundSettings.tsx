import "./BackgroundSettings.css";
import CircleColorPicker from "../../../pickers/CircleColorPicker";
import { DefaultOutline } from "../../../../data/types/CanvasConstants";
import useSettingsStore from "../../../../data/store/BacgroundStore";
import { Continuum_Canvas } from "../../../../features/CanvasApp";

const BacgroundPickerColor = ({ selected }: { selected: boolean }) => {
  const setBackgroundSettings = useSettingsStore().setBackgroundSettings;
  const background = useSettingsStore().background;
  return (
    <>
      <div
        className={`w-20 h-20 outline-2 rounded-sm  cursor-pointer line-pattern ${
          selected ? `${DefaultOutline}` : "outline-gray-800"
        }`}
        style={{
          backgroundColor: Continuum_Canvas.palet.getColor(background.color),
        }}
        onClick={() => setBackgroundSettings({ activeBacgroundType: "color" })}
      />
    </>
  );
};

const BacgroundPickerGrid = ({ selected }: { selected: boolean }) => {
  const setBackgroundSettings = useSettingsStore().setBackgroundSettings;
  const background = useSettingsStore().background;
  return (
    <div
      className={`w-20 h-20 outline-2 rounded-sm  cursor-pointer grid-pattern ${
        selected ? `${DefaultOutline}` : "outline-gray-800"
      }`}
      style={{
        backgroundColor: Continuum_Canvas.palet.getColor(background.color),
        //@ts-ignore
        "--grid-color": Continuum_Canvas.palet.getColor(
          background.color
        ),
      }}
      onClick={() => setBackgroundSettings({ activeBacgroundType: "grid" })}
    />
  );
};

const BacgroundPickerDots = ({ selected }: { selected: boolean }) => {
  const setBackgroundSettings = useSettingsStore().setBackgroundSettings;
  const background = useSettingsStore().background;
  return (
    <div
      className={`w-20 h-20 outline-2 rounded-sm  cursor-pointer dot-pattern ${
        selected ? `${DefaultOutline} ` : "outline-gray-800"
      }`}
      style={{
        backgroundColor: Continuum_Canvas.palet.getColor(background.color),
        //@ts-ignore
        "--dot-color": Continuum_Canvas.palet.getColor(background.dots.dotColor),
      }}
      onClick={() =>
        setBackgroundSettings({
          activeBacgroundType: "dots",
        })
      }
    />
  );
};

const BacgroundPickerLine = ({ selected }: { selected: boolean }) => {
  const setBackgroundSettings = useSettingsStore().setBackgroundSettings;
  const background = useSettingsStore().background;
  return (
    <div
      className={`w-20 h-20 outline-2 rounded-sm  cursor-pointer line-pattern ${
        selected ? `${DefaultOutline} ` : "outline-gray-800"
      }`}
      style={{
        backgroundColor: Continuum_Canvas.palet.getColor(background.color),
        //@ts-ignore
        "--line-color": Continuum_Canvas.palet.getColor(
          background.line.lineColor
        ),
      }}
      onClick={() => setBackgroundSettings({ activeBacgroundType: "line" })}
    />
  );
};

const BackgroundSettings = () => {
  const setBackgroundSettings = useSettingsStore().setBackgroundSettings;
  const background = useSettingsStore().background;

  return (
    <div className="p-4  ">
      <h3 className="text-2xl mb-4">Background Settings</h3>
      <div className="flex gap-4 flex-col">
        <div className="flex flex-col gap-4">
          <div className="text-xl">Background type</div>
          <div className="flex gap-5">
            <BacgroundPickerColor
              selected={background.activeBacgroundType === "color"}
            />
            <BacgroundPickerGrid
              selected={background.activeBacgroundType === "grid"}
            />
            <BacgroundPickerDots
              selected={background.activeBacgroundType === "dots"}
            />
            <BacgroundPickerLine
              selected={background.activeBacgroundType === "line"}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <>
            <div className="text-xl">Background color</div>
            <div className="flex gap-5">
              {background.backgroundColors.map((colorId) => (
                <CircleColorPicker
                  key={colorId}
                  colorId={colorId}
                  selected={background.color === colorId}
                  action={() => {
                    setBackgroundSettings({ color: colorId });
                  }}
                />
              ))}
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default BackgroundSettings;
