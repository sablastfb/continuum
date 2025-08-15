import useCanvasStore from "../../../data/store/CanvasStore";
import { IconOption } from "../../../data/types/CanvasTypes";

function ToolButton({ icon, action }: IconOption) {
  const setActiveTool = useCanvasStore((state) => state.setActiveTool);
  const activeTool = useCanvasStore().activeTool;

  return (
    <>
      <div
        className={`flex items-center hover:cursor-pointer p-1 ${
          action === activeTool ? "outline-2 rounded-xl" : ""
        }`}
        onClick={() => {
          setActiveTool(action);
        }}
      >
        {icon}
      </div>
    </>
  );
}

export default ToolButton;
