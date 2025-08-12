import { Download, Home, Info, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCanvasStore from "../../data/store/CanvasStore";
import { Canvas } from "../../features/CanvasApp";

function OptionButtons() {
  const setSettingVisible = useCanvasStore((state) => state.setSettingVisible);
  const navigate = useNavigate();
  const setExportVisible = useCanvasStore((state) => state.setExportVisible);
  const setInfoVisible = useCanvasStore((state) => state.setInfoVisible);

  return (
    <>
      <div className="absolute left-0 bottom-0  p-2 flex justify-center">
        <div className="pointer-events-auto rounded-2xl p-2 bg-white/10 backdrop-blur-sm flex  gap-4">
          <div
            onClick={() => {
              if (Canvas.viewport)
                Canvas.viewport.animate({
                  time: 500, // animation duration in ms
                  position: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                  },
                  scale: 1,
                  ease: "easeInOutQuad", // optional easing
                });
            }}
          >
            <Home size={30} className="hover:cursor-pointer" />
          </div>
          <Settings
            size={30}
            className="hover:cursor-pointer"
            onClick={() => {
              setSettingVisible(true);
            }}
          />
          <Download
            size={30}
            className="hover:cursor-pointer"
            onClick={() => {
              setExportVisible(true);
            }}
          />
          <Info
            size={30}
            className="hover:cursor-pointer"
            onClick={() => {
              setInfoVisible(true);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default OptionButtons;
