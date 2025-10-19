import BarrelDialogs from "./components/dialog/BarrelDialogs";
import BarrelEffect from "./components/effects/BarrelEffect";
import PixiCanvasComponent from "./components/toolBoxes/CanvasComponent";
import ToolLayout from "./components/toolBoxes/ToolLayout";
import 'dockview-core/dist/styles/dockview.css';
import { MyDockviewLayout } from "./DockviewLayout";

function CanvasPage() {
  return (
    <div className=" h-screen w-screen flex">
      <MyDockviewLayout/>
      {/* <PixiCanvasComponent/>
      <ToolLayout />
      <BarrelDialogs/>
      <BarrelEffect /> */}
    </div>
  );
}

export default CanvasPage;
