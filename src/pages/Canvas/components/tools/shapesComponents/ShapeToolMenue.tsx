import { Circle, HexagonIcon, Square } from "lucide-react";
import { DefaultIconSize } from "../../../data/constants/CanvasConstants";

function ShapeToolMenue() {

  return (
    <>
      <div
        className="cursor-pointer"
        onClick={() => {
        }}
      >
        <Square size={DefaultIconSize} />
        <Circle size={DefaultIconSize}/>
        <HexagonIcon size={DefaultIconSize}/>
      </div>
    </>
  );
}

export default ShapeToolMenue;
