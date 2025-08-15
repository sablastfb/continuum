import { Download, Home, Info, Settings } from "lucide-react";
import useCanvasStore from "../../../data/store/CanvasStore";
import useSettingsStore from "../../../data/store/SettingsStore";
import { CanvasViewport } from "../../../features/service/Viewport";

function OptionButtons() {
  const setSettingVisible = useCanvasStore((state) => state.setSettingVisible);
  const setExportVisible = useCanvasStore((state) => state.setExportVisible);
  const setInfoVisible = useCanvasStore((state) => state.setInfoVisible);
  const toolButtonPosition = useSettingsStore().layout.toolMenue;
  const inline =
    toolButtonPosition === "left" || toolButtonPosition === "right";
  return (
    <>
      <div
        className={`pointer-events-auto rounded-2xl p-2 bg-white/10 backdrop-blur-sm flex items-center h-fit gap-4 ${
          inline && "flex-col"
        }`}
      >
        <div
          onClick={() => {
            if (CanvasViewport.viewport)
              CanvasViewport.viewport.animate({
                time: 500,
                position: {
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                },
                scale: 1,
                ease: "easeInOutQuad",
              });
          }}
        >
          <Home size={30} className="hover:cursor-pointer" />
        </div>
        <Settings
          size={30}
          className="hover:cursor-pointer"
          onClick={() => {
            setSettingVisible(true);
          }}
        />
        <Download
          size={30}
          className="hover:cursor-pointer"
          onClick={() => {
            setExportVisible(true);
          }}
        />
        <Info
          size={30}
          className="hover:cursor-pointer"
          onClick={() => {
            setInfoVisible(true);
          }}
        />
      </div>
    </>
  );
}

export default OptionButtons;
