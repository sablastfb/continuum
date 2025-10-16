import {
  Eraser
} from "lucide-react";
import { DefaultIconSize } from "../../../data/constants/CanvasConstants";

function EraserToolMenue() {

  return (
    <>
      <div
        className="cursor-pointer"
        onClick={() => {
        }}
      >
          <Eraser size={DefaultIconSize} />
      </div>
    </>
  );
}

export default EraserToolMenue;
