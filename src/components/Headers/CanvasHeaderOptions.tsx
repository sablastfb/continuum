import { ChevronLeft, Download, LayoutDashboard, Settings } from "lucide-react";
import useCanvasStore from "../../pages/Canvas/data/store/CanvasStore";

const SmallerIconSize = 25;

const CanvasHeaderOptions = () => {
  const canvasStore = useCanvasStore();

  return (
    <>
      <div className="flex gap-2  ">
        <ChevronLeft className="hover:cursor-pointer" size={SmallerIconSize} />

        <div className="cursor-pointer" onClick={() => canvasStore.setSettingVisible(true)}>
          <Settings size={SmallerIconSize} />
        </div>
        <Download size={SmallerIconSize} />
      </div>
    </>
  );
};

export default CanvasHeaderOptions;
