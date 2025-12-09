import { usePenStore as usePenStore } from "../../../data/store/PenStore";
import CircleColorPicker from "../../pickers/CircleColorPicker";
import CircleThicknesPicker from "../../pickers/CircleThicknesPicker";
import CustomColorPicker from "../../pickers/CustomColorPicker";
import ArrayDivider from "../../misc/ArrayDivider";
import useLayoutStore from "../../../data/store/LayoutStore";
import { Continuum_Canvas } from "../../../features/CanvasApp";

const PenToolQuickOptions = () => {
  const penSettings = usePenStore();
  const pencilColorId = usePenStore().penColorId;
  const thicknesId = usePenStore().thicknesId;
  const setPenColor = usePenStore((state) => state.setPenColor);
  const toolOptionsDirection = useLayoutStore().toolOptionsDirection;
  const setPenThickens = usePenStore(
    (state) => state.setPenThickens
  );

  return (
    <>
      {penSettings.allThicknes.map((id, ix) => {
        return (
          <CircleThicknesPicker
            action={() => {
              setPenThickens({
                thicknes: Continuum_Canvas.thicknesPalet.getThicknes(id),
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
      {penSettings.allPencilColors.map((colorId, ix) => {
        return (
          <CircleColorPicker
            colorId={colorId}
            key={ix}
            selected={colorId === pencilColorId}
            action={() => setPenColor({ colorId: colorId, color: "" })}
          />
        );
      })}
      <CustomColorPicker customColorId="pencilCustomColor" />
    </>
  );
}

export default PenToolQuickOptions;
