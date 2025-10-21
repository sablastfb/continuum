import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  X,
} from "lucide-react";
import { DefaultIconSize } from "../../pages/Canvas/data/types/CanvasConstants";
import useCanvasStore from "../../pages/Canvas/data/store/CanvasStore";
import PixiCanvasComponent from "../../pages/Canvas/components/toolBoxes/CanvasComponent";
import ToolLayout from "../../pages/Canvas/components/toolBoxes/ToolLayout";
import BarrelDialogs from "../../pages/Canvas/components/dialog/BarrelDialogs";
import BarrelEffect from "../../pages/Canvas/components/effects/BarrelEffect";
import { IDockviewPanelProps } from "dockview-core";

export type Direction =  'above' | 'below' | 'left' | 'right';


const ComponentHolder = (props: IDockviewPanelProps<{ panelId: string; onSplit: (direction: Direction) => void;  onRemove: () => void;}>) => {
  const canvasStore = useCanvasStore();
  const { onSplit, onRemove } = props.params;

  return (
    <>
      {canvasStore.layoutEditableVisible && (
        <div  className="h-full w-full bg-stone-900 aspect-square grid grid-cols-3 grid-rows-3 place-items-center p-4">
          {/* Top */}
          <div  onClick={() => onSplit('above')} className="bg-green-500 rounded-full hover:bg-green-700 cursor-pointer col-start-2 row-start-1 flex items-center justify-center">
            <ChevronUp size={DefaultIconSize * 1.2} />
          </div>

          {/* Bottom */}
          <div onClick={() => onSplit('below')}   className="bg-green-500 rounded-full hover:bg-green-700 cursor-pointer col-start-2 row-start-3 flex items-center justify-center">
            <ChevronDown size={DefaultIconSize * 1.2} />
          </div>

          {/* Left */}
          <div onClick={() => onSplit('left')} className="bg-green-500 rounded-full hover:bg-green-700 cursor-pointer col-start-1 row-start-2 flex items-center justify-center">
            <ChevronLeft size={DefaultIconSize * 1.2} />
          </div>

          {/* Right */}
          <div onClick={() => onSplit('right')} className="bg-green-500 rounded-full hover:bg-green-700 cursor-pointer col-start-3 row-start-2 flex items-center justify-center">
            <ChevronRight size={DefaultIconSize * 1.2} />
          </div>

          {/* Center (X button) */}
          <div onClick={() => onRemove()} className="bg-red-500 rounded-full hover:bg-red-700 cursor-pointer col-start-2 row-start-2 flex items-center justify-center">
            <X size={DefaultIconSize * 1.2} />
          </div>
        </div>
      )}
      {!canvasStore.layoutEditableVisible && 
        <>
          <PixiCanvasComponent />
          <ToolLayout />
          <BarrelDialogs />
          <BarrelEffect />
        </>
      }
      
    </>
  );
};

export default ComponentHolder;
