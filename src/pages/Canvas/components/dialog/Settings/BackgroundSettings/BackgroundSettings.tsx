import "./BackgroundSettings.css";
import {
  BackgroundTypes,
  BackgroundSettings as Bs,
  ColorId,
} from "../../../../data/types/CanvasTypes";
import useCanvasStore from "../../../../data/store/CanvasStore";
import { CanvasPalet } from "../../../../data/container/PaletContainer";
import WidthControlForm from "../WidthControlForm";
function BackgroundSettings() {
  const backgroundSetting = useCanvasStore(
    (state) => state.canvasSettings.background
  );
  const setBackgroundSettings = useCanvasStore().setBackgroundSettings;
  const background = useCanvasStore().canvasSettings.background;

  const SquareType = ({
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
            style={{ backgroundColor: CanvasPalet.GetColor(settings.color) }}
            onClick={() => setBackgroundSettings({ type: "color" })}
          />
        )}
        {type === "grid" && (
          <div
            className="w-20 h-20 outline-2 rounded-sm outline-gray-800 cursor-pointer  grid-pattern"
            style={{
              backgroundColor: CanvasPalet.GetColor(
                settings.grid.bacgroundColor
              ),
              //@ts-ignore
              "--grid-color": CanvasPalet.GetColor(settings.grid.gridColor),
            }}
            onClick={() => setBackgroundSettings({ type: "grid" })}
          />
        )}
        {type === "dots" && (
          <div
            className="w-20 h-20 outline-2 rounded-sm outline-gray-800  cursor-pointer dot-pattern"
            style={{
              backgroundColor: CanvasPalet.GetColor(
                settings.dots.bacgroundColor
              ),
              //@ts-ignore
              "--dot-color": CanvasPalet.GetColor(settings.dots.dotColor),
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
              backgroundColor: CanvasPalet.GetColor(
                settings.line.bacgroundColor
              ),
              //@ts-ignore
              "--line-color": CanvasPalet.GetColor(settings.line.lineColor),
            }}
            onClick={() => setBackgroundSettings({ type: "line" })}
          />
        )}
      </>
    );
  };

  const CircleColorButton = ({ color }: { color: ColorId }) => {
    return (
      <>
        <div
          style={{ backgroundColor: CanvasPalet.GetColor(color) }}
          onClick={() => {
            switch (backgroundSetting.type) {
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
            <SquareType type="color" settings={background} />
            <SquareType type="grid" settings={background} />
            <SquareType type="dots" settings={background} />
            <SquareType type="line" settings={background} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-xl">Background color</div>
          <div className="flex gap-5">
            {backgroundSetting.backgroundColors.map((colorId) => (
              <CircleColorButton key={colorId} color={colorId} />
            ))}
          </div>
            {backgroundSetting.type === "grid" && <WidthControlForm></WidthControlForm>}
            {backgroundSetting.type === "dots" && <div>Dots</div>}
            {backgroundSetting.type === "line" && <div>Line</div>}
        </div>
        {}
      </div>
    </div>
  );
}

export default BackgroundSettings;
