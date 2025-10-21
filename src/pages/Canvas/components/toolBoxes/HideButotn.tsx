import { Eye, PencilLine, PencilRuler } from "lucide-react";
import {
  DefaultButtonsBackground,
  DefaultIconSize,
} from "../../data/types/CanvasConstants";
import useCanvasStore from "../../data/store/CanvasStore";

const HideQuickToolSettings = () => {
  const canvasStore = useCanvasStore();

  return (
    <>
      <div
        className={`${DefaultButtonsBackground} rounded-full p-1 pointer-events-auto  hidden xl:flex items-center gap-1 cursor-pointer hover:bg-stone-500`}
        onClick={() => canvasStore.setQuickToolsVisibility(!canvasStore.qucikToolsActive)}
      >
        {/* <PencilRuler  size={DefaultIconSize} className=" rounded-2xl p-1" /> */}
        {canvasStore.qucikToolsActive && <PencilRuler size={DefaultIconSize} />}
        {!canvasStore.qucikToolsActive && <Eye size={DefaultIconSize} />}
      </div>
    </>
  );
};

export default HideQuickToolSettings;
