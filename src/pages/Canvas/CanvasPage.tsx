import BarrelDialogs from "./components/dialog/BarrelDialogs";
import BarrelEffect from "./components/effects/BarrelEffect";
import PixiCanvasComponent from "./components/toolBoxes/CanvasComponent";
import ToolLayout from "./components/toolBoxes/ToolLayout";
import "dockview-core/dist/styles/dockview.css";

const CanvasPage = () => {
  return (
    <>
      <div className="relative h-full w-full">
        <ToolLayout />
        <PixiCanvasComponent />
        <BarrelDialogs />
        <BarrelEffect />
      </div>
    </>
  );
};

export default CanvasPage;
