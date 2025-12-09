import { Highlighter, Pen } from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutline,
} from "../../../data/constants/CanvasConstants";
import useToolStore from "../../../data/store/ToolStore";
import { usePenStore } from "../../../data/store/PenStore";
import { useMarkerStore } from "../../../data/store/MarkerStore";

const EmojiToolMenue = () => {
  const toolStore = useToolStore();
  const penStore = usePenStore();
  const markerStore = useMarkerStore();
  return (
    <>
      <div>
               😁

      </div>
    </>
  );
}

export default EmojiToolMenue;
