import { Download, Keyboard, Settings } from "lucide-react";

import useCanvasStore from "../../data/store/CanvasStore";
import { DefaultButtonsBackground, DefaultIconSize } from "../../../../constants/CanvasConstants";

const OptionButton = () => {
  const setSettingVisible = useCanvasStore((state) => state.setSettingVisible);
  const setExportVisible = useCanvasStore((state) => state.setExportVisible);
  const setInfoVisible = useCanvasStore((state) => state.setInfoVisible);

  return (
    <>
      <Settings
        size={DefaultIconSize}
        className="hover:cursor-pointer"
        onClick={() => {
          setSettingVisible(true);
        }}
      />
      <Keyboard
        size={DefaultIconSize}
        className="hover:cursor-pointer"
        onClick={() => {
          setInfoVisible(true);
        }}
      />
      <Download
        size={DefaultIconSize}
        className="hover:cursor-pointer"
        onClick={() => {
          setExportVisible(true);
        }}
      />
    </>
  );
}

const OptionButtons = () => {

  return (
    <>
      <div
        className={`flex  ${DefaultButtonsBackground} pointer-events-auto rounded-md  bg-white/10 backdrop-blur-sm items-center gap-2 m-1 p-1`}
      >
        <OptionButton />
      </div>
    </>
  );
}

export default OptionButtons;
