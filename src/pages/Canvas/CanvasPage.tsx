import BarrelDialogs from "./components/dialog/BarrelDialogs";
import BarrelEffect from "./components/effects/BarrelEffect";
import PixiCanvasComponent from "./components/components/CanvasComponent";
import ToolLayout from "./components/components/ToolLayout";

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
