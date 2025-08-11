import "./BackgroundSettings.css";
import {
  BackgroundTypes,
  BackgroundSettings as Bs,
} from "../../../../data/types/CanvasTypes";
import useCanvasStore from "../../../../data/store/CanvasStore";
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
            style={{ backgroundColor: settings.color }}
            onClick={() => setBackgroundSettings({ type: "color" })}
          />
        )}
        {type === "grid" && (
          <div
            className="w-20 h-20 outline-2 rounded-sm outline-gray-800 cursor-pointer  grid-pattern"
            style={{
              backgroundColor: settings.grid.bacgroundColor,
              //@ts-ignore
              "--grid-color": settings.grid.gridColor,
            }}
            onClick={() => setBackgroundSettings({ type: "grid" })}
          />
        )}
        {type === "dots" && (
          <div
            className="w-20 h-20 outline-2 rounded-sm outline-gray-800  cursor-pointer dot-pattern"
            style={{
              backgroundColor: settings.dots.bacgroundColor,
              //@ts-ignore
              "--dot-color": settings.dots.dotColor,
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
              backgroundColor: settings.line.bacgroundColor,
              //@ts-ignore
              "--line-color": settings.line.lineColor,
            }}
            onClick={() => setBackgroundSettings({ type: "line" })}
          />
        )}
      </>
    );
  };

  const CircleColorButton = ({
    color,
    type,
  }: {
    color: string;
    type: BackgroundTypes;
  }) => {
    return (
      <>
        <div
          style={{ backgroundColor: color }}
          onClick={() => {
            switch (type) {
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
      <h3 className="text-2xl mb-4">Background Settings
      </h3>
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
            <CircleColorButton color="#231F20" type={backgroundSetting.type} />
            <CircleColorButton color="#0A1931" type={backgroundSetting.type} />
            <CircleColorButton color="#2E2E2E" type={backgroundSetting.type} />
            <CircleColorButton color="#1B263B" type={backgroundSetting.type} />
            <CircleColorButton color="#2F4F4F" type={backgroundSetting.type} />
            <CircleColorButton color="#2D033B" type={backgroundSetting.type} />
          </div>
        </div>
        {
            backgroundSetting.type ===  'line' &&
            <div className="flex flex-col gap-4">
            <div className="text-xl">Background color</div>
            <div className="flex gap-5">
              <CircleColorButton color="#231F20" type={backgroundSetting.type} />
              <CircleColorButton color="#0A1931" type={backgroundSetting.type} />
              <CircleColorButton color="#2E2E2E" type={backgroundSetting.type} />
              <CircleColorButton color="#1B263B" type={backgroundSetting.type} />
              <CircleColorButton color="#2F4F4F" type={backgroundSetting.type} />
              <CircleColorButton color="#2D033B" type={backgroundSetting.type} />
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default BackgroundSettings;
