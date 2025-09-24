import { Download, Home, Info, Plus, Settings } from "lucide-react";
import useCanvasStore from "../../../data/store/CanvasStore";
import useSettingsStore from "../../../data/store/SettingsStore";
import { Continuum_CanvasViewport } from "../../../features/service/Viewport";
import { defaultButtonsBackground, defaultIconSize } from "../../../data/constants/CanvasConstants";
import { Continuum_Bookmark } from "../../../features/service/BookMark";

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
        className={`${defaultButtonsBackground} pointer-events-auto rounded-2xl  bg-white/10 backdrop-blur-sm flex items-center h-fit gap-4 ${
          inline && "flex-col"
        }`}
      >
        <div onClick={()=> Continuum_Bookmark.moveToLast()}>
          <Plus/>
        </div>
         <div onClick={()=> Continuum_Bookmark.addBookmark()}>
          <Plus/>
        </div>
        <div
        onClick={()=> Continuum_Bookmark.moveHome()}>
          <Home size={defaultIconSize} className="hover:cursor-pointer" />
        </div>
        <Settings
          size={defaultIconSize}
          className="hover:cursor-pointer"
          onClick={() => {
            setSettingVisible(true);
          }}
        />
        <Download
          size={defaultIconSize}
          className="hover:cursor-pointer"
          onClick={() => {
            setExportVisible(true);
          }}
        />
        <Info
          size={defaultIconSize}
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
