import { Redo, Undo } from "lucide-react";
import { defaultIconSize } from "../../../data/constants/CanvasConstants";
import useCanvasStore from "../../../data/store/CanvasStore";
import { Continuum_Canvas } from "../../../features/CanvasApp";
import useLayoutStore from "../../../data/store/LayoutStore";

function DoUnDoComponent() {
  const historyPosition = useCanvasStore().historyPosition;
  const historyCount = useCanvasStore().historyCount;
  const layoutStore = useLayoutStore().toolMenuesDirection;

  return (
    <>
      <div className="pointer-events-auto flex gap-2 px-1">
        <div
          onClick={() => Continuum_Canvas.commandManage.goBack()}
          className={
            historyPosition === -1 ? "opacity-50 " : "hover:cursor-pointer"
          }
        >
          <Undo size={defaultIconSize} />
        </div>
        <div
          onClick={() => Continuum_Canvas.commandManage.goInFuture()}
          className={
            historyPosition >= historyCount - 1
              ? "opacity-50 "
              : "hover:cursor-pointer"
          }
        >
          <Redo size={defaultIconSize} />
        </div>
      </div>
    </>
  );
}

export default DoUnDoComponent;
