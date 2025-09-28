import { Download, Info, Menu, Settings } from "lucide-react";
import useCanvasStore from "../../../data/store/CanvasStore";
import {
  defaultButtonsBackground,
  defaultIconSize,
} from "../../../data/constants/CanvasConstants";
import BookmakrComponent from "../../bookmark/BookMarkComponent";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";

function OptionButton() {
  const setSettingVisible = useCanvasStore((state) => state.setSettingVisible);
  const setExportVisible = useCanvasStore((state) => state.setExportVisible);
  const setInfoVisible = useCanvasStore((state) => state.setInfoVisible);

  return (
    <>
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

      <BookmakrComponent />
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
        className={`  xs:hidden flex  ${defaultButtonsBackground} pointer-events-auto rounded-md `}
       onClick={(e) => {
            op.current!.toggle(e);
          }}
      >
        <Menu
          size={defaultIconSize}
          className="hover:cursor-pointer"
        />
      </div>
      <div
        className={` hidden xs:flex  ${defaultButtonsBackground} pointer-events-auto rounded-md  bg-white/10 backdrop-blur-sm items-center h-fit gap-4 `}
      >
        <OptionButton />
      </div>
    </>
  );
}

export default OptionButtons;
