import { ZoomIn, ZoomOut } from "lucide-react";
import useCanvasStore from "../../data/store/CanvasStore";
import {
  DefaultButtonsBackground,
  DefaultIconSize,
} from "../../../../constants/CanvasConstants";
import { Continuum_Canvas } from "../../features/CanvasApp";

const ZoomingButton = () => {
  const zoom = useCanvasStore((state) => state.zoom);
  const canvasStore = useCanvasStore();
  return (
    <>
        {canvasStore.editingModOn && (
          <>
            <div
              className={`${DefaultButtonsBackground} p-1 pointer-events-auto rounded-md flex items-center gap-1`}
            >
              <ZoomIn
                className="hover:cursor-pointer"
                size={DefaultIconSize}
                onClick={() => Continuum_Canvas.resizeService.manualZoom(1)}
              />
              <div className="select-none text-xl w-20 text-center">
                {(zoom * 100).toFixed(1)}%
              </div>
              <ZoomOut
                className="hover:cursor-pointer"
                size={DefaultIconSize}
                onClick={() => Continuum_Canvas.resizeService.manualZoom(-1)}
              />
            </div>
          </>
        )}
    </>
  );
};

export default ZoomingButton;
