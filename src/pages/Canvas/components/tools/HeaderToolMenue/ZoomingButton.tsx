import { ZoomIn, ZoomOut } from "lucide-react";
import useCanvasStore from "../../../data/store/CanvasStore";
import { Continuum_ResizeService } from "../../../features/service/Resize";
import { defaultButtonsBackground, defaultIconSize } from "../../../data/constants/CanvasConstants";

function ZoomingButton() {
  const zoome = useCanvasStore((state) => state.zoome);
  return (
    <>
        <div className={`${defaultButtonsBackground} p-1 pointer-events-auto rounded-2xl flex items-center gap-1`}>
          <ZoomIn
            className="hover:cursor-pointer"
            size={defaultIconSize}
            onClick={() => Continuum_ResizeService.manualZoom(1)}
          />
          <div className="select-none text-xl w-20 text-center">{(zoome * 100).toFixed(1)}%</div>
          <ZoomOut
            className="hover:cursor-pointer"
            size={defaultIconSize}
            onClick={() => Continuum_ResizeService.manualZoom(-1)}
          />
        </div>
    </>
  );
}

export default ZoomingButton;
