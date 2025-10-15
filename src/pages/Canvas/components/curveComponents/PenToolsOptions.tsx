import { ThicknesPalet } from "../../data/thicknes/ThickneContainer";
import { usePencileStore } from "../../data/store/PencileStore";
import CircleColorPicker from "../pickers/CircleColorPicker";
import CircleThicknesPicker from "../pickers/CircleThicknesPicker";
import CustomColorPicker from "../pickers/CustomColorPicker";
import ArrayDivider from "../misc/ArrayDivider";
import {
  Ellipsis,
  EllipsisVertical,
  Highlighter,
  Pen,
  Pencil,
} from "lucide-react";
import { DefaultIconSize } from "../../data/constants/CanvasConstants";
import useLayoutStore from "../../data/store/LayoutStore";

function PenToolOptions() {
  const pencileSettings = usePencileStore();
  const pencilColorId = usePencileStore().pencilColorId;
  const thicknesId = usePencileStore().thicknesId;
  const setPencileColor = usePencileStore((state) => state.setPencileColor);
  const toolOptionsDirection = useLayoutStore().toolOptionsDirection;
  const setPencileThickens = usePencileStore(
    (state) => state.setPencileThickens
  );

  return (
    <>
      {toolOptionsDirection === "horizontal" ? (
        <EllipsisVertical size={DefaultIconSize} />
      ) : (
        <Ellipsis size={DefaultIconSize} />
      )}
      <ArrayDivider direction={toolOptionsDirection} />
      <Pen size={DefaultIconSize} />
      <Pencil size={DefaultIconSize} />
      <Highlighter size={DefaultIconSize} />
      <ArrayDivider direction={toolOptionsDirection} />
      {pencileSettings.allThicknes.map((id, ix) => {
        return (
          <CircleThicknesPicker
            action={() => {
              setPencileThickens({
                thicknes: ThicknesPalet.getThicknes(id),
                thicknesId: id,
              });
            }}
            thicknesId={id}
            selected={thicknesId === id}
            key={ix}
          />
        );
      })}
      <ArrayDivider direction={toolOptionsDirection} />
      {pencileSettings.allPencilColors.map((colorId, ix) => {
        return (
          <CircleColorPicker
            colorId={colorId}
            key={ix}
            selected={colorId === pencilColorId}
            action={() => setPencileColor({ colorId: colorId, color: "" })}
          />
        );
      })}
      <CustomColorPicker customColorId="pencilCustomColor" />
    </>
  );
}

export default PenToolOptions;
