import "./BackgroundSettings.css";
import { Continuum_CanvasPalet } from "../../../../data/palet/PaletContainer";
import CircleColorPicker from "../../../pickers/CircleColorPicker";
import { defaultOutlineColor } from "../../../../data/constants/CanvasConstants";
import useSettingsStore from "../../../../data/store/SettingsStore";

function BacgroundPickerColor({ selected }: { selected: boolean }) {
  const setBackgroundSettings = useSettingsStore().setBackgroundSettings;
  const background = useSettingsStore().background;
  return (
    <>
      <div
        className={`w-20 h-20 outline-2 rounded-sm  cursor-pointer line-pattern ${
          selected ? `${defaultOutlineColor}` : "outline-gray-800"
        }`}
        style={{ backgroundColor: Continuum_CanvasPalet.getColor(background.color) }}
        onClick={() => setBackgroundSettings({ activeBacgroundType: "color" })}
      />
    </>
  );
}

function BacgroundPickerGrid({ selected }: { selected: boolean }) {
  const setBackgroundSettings = useSettingsStore().setBackgroundSettings;
  const background = useSettingsStore().background;
  return (
    <div
      className={`w-20 h-20 outline-2 rounded-sm  cursor-pointer grid-pattern ${
        selected ? `${defaultOutlineColor}` : "outline-gray-800"
      }`}
      style={{
        backgroundColor: Continuum_CanvasPalet.getColor(background.grid.bacgroundColor),
        //@ts-ignore
        "--grid-color": Continuum_CanvasPalet.getColor(background.grid.gridColor),
      }}
      onClick={() => setBackgroundSettings({ activeBacgroundType: "grid" })}
    />
  );
}

function BacgroundPickerDots({ selected }: { selected: boolean }) {
  const setBackgroundSettings = useSettingsStore().setBackgroundSettings;
  const background = useSettingsStore().background;
  return (
    <div
      className={`w-20 h-20 outline-2 rounded-sm  cursor-pointer dot-pattern ${
        selected ? `${defaultOutlineColor} ` : "outline-gray-800"
      }`}
      style={{
        backgroundColor: Continuum_CanvasPalet.getColor(background.dots.bacgroundColor),
        //@ts-ignore
        "--dot-color": Continuum_CanvasPalet.getColor(background.dots.dotColor),
      }}
      onClick={() =>
        setBackgroundSettings({
          activeBacgroundType: "dots",
        })
      }
    />
  );
}

function BacgroundPickerLine({ selected }: { selected: boolean }) {
  const setBackgroundSettings = useSettingsStore().setBackgroundSettings;
  const background = useSettingsStore().background;
  return (
    <div
      className={`w-20 h-20 outline-2 rounded-sm  cursor-pointer line-pattern ${
        selected ? `${defaultOutlineColor} ` : "outline-gray-800"
      }`}
      style={{
        backgroundColor: Continuum_CanvasPalet.getColor(background.line.bacgroundColor),
        //@ts-ignore
        "--line-color": Continuum_CanvasPalet.getColor(background.line.lineColor),
      }}
      onClick={() => setBackgroundSettings({ activeBacgroundType: "line" })}
    />
  );
}

function BackgroundSettings() {
  const setBackgroundSettings = useSettingsStore().setBackgroundSettings;
  const background = useSettingsStore().background;

  return (
    <div className="p-4 ">
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
          {background.activeBacgroundType === "color" && (
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
          )}
          {background.activeBacgroundType === "grid" && (
            <>
              <div className="text-xl">Background color</div>
              <div className="flex gap-5">
                {background.backgroundColors.map((colorId) => (
                  <CircleColorPicker
                    key={colorId}
                    colorId={colorId}
                    selected={background.grid.bacgroundColor === colorId}
                    action={() => {
                      setBackgroundSettings({
                        grid: { bacgroundColor: colorId },
                      });
                    }}
                  />
                ))}
              </div>
            </>
          )}
          {background.activeBacgroundType === "dots" && (
            <>
              <div className="text-xl">Background color</div>
              <div className="flex gap-5">
                {background.backgroundColors.map((colorId) => (
                  <CircleColorPicker
                    key={colorId}
                    colorId={colorId}
                    selected={background.dots.bacgroundColor === colorId}
                    action={() => {
                      setBackgroundSettings({
                        dots: { bacgroundColor: colorId },
                      });
                    }}
                  />
                ))}
              </div>
            </>
          )}
          {background.activeBacgroundType === "line" && (
            <>
              <div className="text-xl">Background color</div>
              <div className="flex gap-5">
                {background.backgroundColors.map((colorId) => (
                  <CircleColorPicker
                    key={colorId}
                    colorId={colorId}
                    selected={background.line.bacgroundColor === colorId}
                    action={() => {
                      setBackgroundSettings({
                        line: { bacgroundColor: colorId },
                      });
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BackgroundSettings;
