import { Redo, Undo } from "lucide-react";
import useCanvasStore from "../../data/store/CanvasStore";
import useLayoutStore from "../../data/store/LayoutStore";
import { Continuum_Canvas } from "../../features/CanvasApp";
import { DefaultIconSize } from "../../data/constants/CanvasConstants";



function DoUnDoComponent() {
  const historyPosition = useCanvasStore().historyPosition;
  const historyCount = useCanvasStore().historyCount;
  const layoutStore = useLayoutStore().toolMenuesDirection;

  return (
    <>
      <div className={`pointer-events-auto flex gap-2 px-1 ${layoutStore === 'vertical' && 'flex-col h-full '}`}>
        <div
          onClick={() => Continuum_Canvas.commandManage.goBack()}
          className={
            historyPosition === -1 ? "opacity-50 " : "hover:cursor-pointer"
          }
        >
          <Undo size={DefaultIconSize} />
        </div>
        <div
          onClick={() => Continuum_Canvas.commandManage.goInFuture()}
          className={
            historyPosition >= historyCount - 1
              ? "opacity-50 "
              : "hover:cursor-pointer"
          }
        >
          <Redo size={DefaultIconSize} />
        </div>
      </div>
    </>
  );
}

export default DoUnDoComponent;
