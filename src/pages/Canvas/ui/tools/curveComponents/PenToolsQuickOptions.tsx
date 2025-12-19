import { useCurveStore as useCurveStore } from "../../../data/store/PenStore";
import CircleColorPicker from "../../pickers/CircleColorPicker";
import CircleThicknessPicker from "../../pickers/CircleThicknessPicker.tsx";
import CustomColorPicker from "../../pickers/CustomColorPicker";
import ArrayDivider from "../../misc/ArrayDivider";
import useLayoutStore from "../../../data/store/LayoutStore";
import { Continuum_Canvas } from "../../../features/CanvasApp";

const PenToolQuickOptions = () => {
  const penSettings = useCurveStore();
  const pencilColorId = useCurveStore().penSettings.colorId;
  const thicknessId = useCurveStore().thicknessId;
  const setPenColor = useCurveStore((state) => state.setPenColor);
  const toolOptionsDirection = useLayoutStore().toolOptionsDirection;
  const setPenThickens = useCurveStore(
    (state) => state.setPenThickens
  );

  return (
    <>
      {penSettings.penSettings.allThickness.map((id, ix) => {
        return (
          <CircleThicknessPicker
            action={() => {
              setPenThickens({
                thickness: Continuum_Canvas.thicknessPalette.getThickness(id),
                thicknessId: id,
              });
            }}
            thicknessId={id}
            selected={thicknessId === id}
            key={ix}
          />
        );
      })}
      <ArrayDivider direction={toolOptionsDirection} />
      {penSettings.penSettings.allPencilColors.map((colorId, ix) => {
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
