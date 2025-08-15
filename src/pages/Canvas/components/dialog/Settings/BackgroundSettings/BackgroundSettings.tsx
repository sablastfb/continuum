import "./BackgroundSettings.css";
import {
  ColorId,
} from "../../../../data/types/CanvasTypes";
import { CanvasPalet } from "../../../../data/container/PaletContainer";
import useSettingsStore, { BackgroundTypes, BackgroundSettings as Bs } from "../../../../data/store/SettingsStore";
function BackgroundSettings() {
  const setBackgroundSettings = useSettingsStore().setBackgroundSettings;
  const background = useSettingsStore().background;

  const BacgroundPicker = ({
    settings,
    type,
  }: {
    settings: Bs;
    type: BackgroundTypes;
  }) => {
    return (
      <>
        {type === "color" && (
          <div
            className="w-20 h-20 outline-2 rounded-sm outline-gray-800 cursor-pointer"
            style={{ backgroundColor: CanvasPalet.getColor(settings.color) }}
            onClick={() => setBackgroundSettings({ type: "color" })}
          />
        )}
        {type === "grid" && (
          <div
            className="w-20 h-20 outline-2 rounded-sm outline-gray-800 cursor-pointer  grid-pattern"
            style={{
              backgroundColor: CanvasPalet.getColor(
                settings.grid.bacgroundColor
              ),
              //@ts-ignore
              "--grid-color": CanvasPalet.getColor(settings.grid.gridColor),
            }}
            onClick={() => setBackgroundSettings({ type: "grid" })}
          />
        )}
        {type === "dots" && (
          <div
            className="w-20 h-20 outline-2 rounded-sm outline-gray-800  cursor-pointer dot-pattern"
            style={{
              backgroundColor: CanvasPalet.getColor(
                settings.dots.bacgroundColor
              ),
              //@ts-ignore
              "--dot-color": CanvasPalet.getColor(settings.dots.dotColor),
            }}
            onClick={() =>
              setBackgroundSettings({
                type: "dots",
              })
            }
          />
        )}
        {type === "line" && (
          <div
            className="w-20 h-20 outline-2 rounded-sm outline-gray-800 cursor-pointer  line-pattern"
            style={{
              backgroundColor: CanvasPalet.getColor(
                settings.line.bacgroundColor
              ),
              //@ts-ignore
              "--line-color": CanvasPalet.getColor(settings.line.lineColor),
            }}
            onClick={() => setBackgroundSettings({ type: "line" })}
          />
        )}
      </>
    );
  };

  // TODO REMOVE
  const CircleColorButton = ({ color }: { color: ColorId }) => {
    return (
      <>
        <div
          style={{ backgroundColor: CanvasPalet.getColor(color) }}
          onClick={() => {
            switch (background.type) {
              case "color":
                setBackgroundSettings({ color: color });
                break;
              case "dots":
                setBackgroundSettings({ dots: { bacgroundColor: color } });
                break;
              case "grid":
                setBackgroundSettings({ grid: { bacgroundColor: color } });
                break;
              case "line":
                setBackgroundSettings({ line: { bacgroundColor: color } });
                break;
            }
          }}
          className={`hover:cursor-pointer rounded-full w-7 h-7 outline-neutral-900 outline-1`}
        ></div>
      </>
    );
  };

  return (
    <div className="p-4 ">
      <h3 className="text-2xl mb-4">Background Settings</h3>
      <div className="flex gap-4 flex-col">
        <div className="flex flex-col gap-4">
          <div className="text-xl">Background type</div>
          <div className="flex gap-5">
            <BacgroundPicker type="color" settings={background}  />
            <BacgroundPicker type="grid" settings={background} />
            <BacgroundPicker type="dots" settings={background} />
            <BacgroundPicker type="line" settings={background} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-xl">Background color</div>
          <div className="flex gap-5">
            {background.backgroundColors.map((colorId) => (
              <CircleColorButton key={colorId} color={colorId} />
            ))}
          </div>
            {background.type === "grid" }
            {background.type === "dots" && <div>Dots</div>}
            {background.type === "line" && <div>Line</div>}
        </div>
        {}
      </div>
    </div>
  );
}

export default BackgroundSettings;
