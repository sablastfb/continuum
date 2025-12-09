import PixiCanvasComponent from "./ui/components/CanvasComponent";
import ToolLayout from "./ui/components/ToolLayout";
import BarrelDialogs from "./ui/dialog/BarrelDialogs";
import BarrelEffect from "./ui/effects/BarrelEffect";

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
