import { ColorPicker } from "primereact/colorpicker";
import useCanvasStore from "../../../data/CanvasStore";

function BackgroundSettings() {
  const backgroundSetting = useCanvasStore(
    (state) => state.canvasSettings.background
  );
  const setBackgroundColor = useCanvasStore().setBackgroundColor;

  const CircleColorButton = ({ color }: { color: string }) => {
    return (
      <>
        <div
          style={{ backgroundColor: color }}
          onClick={() => setBackgroundColor(color)}
          className={`hover:cursor-pointer rounded-full w-7 h-7 outline-neutral-200 outline-1`}
        ></div>
      </>
    );
  };

  return (
    <div className="p-4">
      <h3 className="text-2xl text-white mb-4">Background Settings</h3>
      <div className="flex flex-col gap-4">
        <div className="text-xl">Background color</div>
        <div className="flex gap-5">
          <CircleColorButton color="#231F20" />
          <CircleColorButton color="#0A1931" />
          <CircleColorButton color="#2E2E2E" />
          <CircleColorButton color="#1B263B" />
          <CircleColorButton color="#2F4F4F" />
          <CircleColorButton color="#2D033B" />
           <ColorPicker
            value={backgroundSetting.color}
            onChange={(e) => {
              console.log(backgroundSetting);
              setBackgroundColor(e.value as string);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default BackgroundSettings;
