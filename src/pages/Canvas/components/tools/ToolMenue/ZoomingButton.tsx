import { ZoomIn, ZoomOut } from "lucide-react";
import useCanvasStore from "../../../data/store/CanvasStore";
import { CanvasResize } from "../../../features/service/Resize";
import { defaultIconSize } from "../../../data/constants/CanvasConstants";

function ZoomingButton() {
  const zoome = useCanvasStore((state) => state.zoome);
  return (
    <>
        <div className={`p-1 pointer-events-auto rounded-2xl bg-white/10 backdrop-blur-sm flex items-center gap-1`}>
          <ZoomIn
            className="hover:cursor-pointer"
            size={defaultIconSize}
            onClick={() => CanvasResize.manualZoom(1)}
          />
          <div className="select-none text-xl w-20 text-center">{(zoome * 100).toFixed(1)}%</div>
          <ZoomOut
            className="hover:cursor-pointer"
            size={defaultIconSize}
            onClick={() => CanvasResize.manualZoom(-1)}
          />
        </div>
    </>
  );
}

export default ZoomingButton;
