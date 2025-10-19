import { ZoomIn, ZoomOut } from "lucide-react";
import useCanvasStore from "../../data/store/CanvasStore";
import { DefaultButtonsBackground, DefaultIconSize } from "../../data/types/CanvasConstants";
import { Continuum_ResizeService } from "../../features/service/Resize";



const ZoomingButton = () => {
  const zoome = useCanvasStore((state) => state.zoome);
  return (
    <>
        <div className={`${DefaultButtonsBackground}  absolute top-0 right-0 m-1 p-1 pointer-events-auto rounded-md hidden xl:flex items-center gap-1`}>
          <ZoomIn
            className="hover:cursor-pointer"
            size={DefaultIconSize}
            onClick={() => Continuum_ResizeService.manualZoom(1)}
          />
          <div className="select-none text-xl w-20 text-center">{(zoome * 100).toFixed(1)}%</div>
          <ZoomOut
            className="hover:cursor-pointer"
            size={DefaultIconSize}
            onClick={() => Continuum_ResizeService.manualZoom(-1)}
          />
        </div>
    </>
  );
}

export default ZoomingButton;
