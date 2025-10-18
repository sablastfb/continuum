import BarrelDialogs from "./components/dialog/BarrelDialogs";
import BarrelEffect from "./components/effects/BarrelEffect";
import PixiCanvasComponent from "./components/toolBoxes/CanvasComponent";
import ToolLayout from "./components/toolBoxes/ToolLayout";

function CanvasPage() {
  return (
    <div className=" h-screen w-screen flex">
      <PixiCanvasComponent/>
      <ToolLayout />
      <BarrelDialogs/>
      <BarrelEffect />
    </div>
  );
}

export default CanvasPage;
