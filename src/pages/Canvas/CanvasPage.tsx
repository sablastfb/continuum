import ContinumLayout from "../../components/Layout/Layout";
import { MyDockviewLayout } from "../../components/Layout/DockviewLayout";
import BarrelDialogs from "./components/dialog/BarrelDialogs";
import BarrelEffect from "./components/effects/BarrelEffect";
import PixiCanvasComponent from "./components/toolBoxes/CanvasComponent";
import ToolLayout from "./components/toolBoxes/ToolLayout";
import "dockview-core/dist/styles/dockview.css";



const CanvasPage = () => {
  return (
    <div className=" relative flex  h-full">
      <ContinumLayout />
    </div>
  );
};

export default CanvasPage;
