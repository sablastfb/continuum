import { ChevronLeft, CircleChevronLeft, Download, Info, Keyboard, Menu, Settings } from "lucide-react";

import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import useCanvasStore from "../../data/store/CanvasStore";
import { DefaultButtonsBackground, DefaultIconSize } from "../../data/types/CanvasConstants";

function OptionButton() {
  const setSettingVisible = useCanvasStore((state) => state.setSettingVisible);
  const setExportVisible = useCanvasStore((state) => state.setExportVisible);
  const setInfoVisible = useCanvasStore((state) => state.setInfoVisible);

  return (
    <>
      <CircleChevronLeft   className="hover:cursor-pointer" size={DefaultIconSize} />
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

function OptionButtons() {
  const op = useRef<OverlayPanel>(null);

  return (
    <>
      <OverlayPanel ref={op}>
        <OptionButton />
      </OverlayPanel>
      <div
        className={`  xl:hidden absolute  flex  left-10 ${DefaultButtonsBackground} pointer-events-auto rounded-md `}
        onClick={(e) => {
          op.current!.toggle(e);
        }}
      >
        <Menu size={DefaultIconSize} className="hover:cursor-pointer" />
      </div>
      <div
        className={` hidden xl:flex  ${DefaultButtonsBackground} pointer-events-auto rounded-md  bg-white/10 backdrop-blur-sm items-center gap-2 m-1 p-1`}
      >
        <OptionButton />
      </div>
    </>
  );
}

export default OptionButtons;
