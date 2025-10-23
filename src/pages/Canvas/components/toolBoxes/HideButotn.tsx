import { Eye, PencilRuler } from "lucide-react";
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
        className={`${DefaultButtonsBackground} rounded-full p-1 pointer-events-auto  hidden xl:flex items-center gap-1 cursor-pointer  hover:bg-amber-100 dark:hover:bg-stone-500`}
        onClick={() => canvasStore.setEdditingMod(!canvasStore.editingModOn)}
      >
        {/* <PencilRuler  size={DefaultIconSize} className=" rounded-2xl p-1" /> */}
        {canvasStore.editingModOn && <PencilRuler strokeWidth={1.5} size={DefaultIconSize}  />}
        {!canvasStore.editingModOn && <Eye size={DefaultIconSize/1.4} />}
      </div>
    </>
  );
};

export default HideQuickToolSettings;
