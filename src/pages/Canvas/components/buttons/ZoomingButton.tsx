import { ZoomIn, ZoomOut } from "lucide-react";
import { defaultCanvasBackground } from "../../data/constants/CanvasConstants";
import { Canvas } from "../../features/CanvasApp";
import useCanvasStore from "../../data/store/CanvasStore";

function ZoomingButton() {
  const zoome = useCanvasStore((state) => state.zoome);

  return (
    <>
      <div className="absolute right-0 bottom-0 p-2">
        <div
          className={`flex gap-2 justify-center items-center pointer-events-auto rounded-2xl p-2 gap-2text-gray-300 text-xl ${defaultCanvasBackground}`}
        >
          <ZoomIn
            className="hover:cursor-pointer"
            size={25}
            onClick={() => Canvas.zoom(1)}
          />
         <span className="select-none">{(zoome * 100).toFixed(1)}%</span>
          <ZoomOut
            className="hover:cursor-pointer"
            size={25}
            onClick={() => Canvas.zoom(-1)}
          />
        </div>
      </div>
    </>
  );
}

export default ZoomingButton;
