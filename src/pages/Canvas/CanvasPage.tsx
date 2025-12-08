import BarrelDialogs from "./components/dialog/BarrelDialogs";
import BarrelEffect from "./components/effects/BarrelEffect";
import PixiCanvasComponent from "./components/toolBoxes/CanvasComponent";
import ToolLayout from "./components/toolBoxes/ToolLayout";
import useCanvasStore from "./data/store/CanvasStore";

const CanvasPage = () => {
  return (
    <>
      <div className="relative h-full w-full">
        <div
          className="absolute inset-0 z-0"
        >
          <PixiCanvasComponent />
        </div>
        <ToolLayout />
        <BarrelDialogs />
        <BarrelEffect />
      </div>
    </>
  );
};

export default CanvasPage;
