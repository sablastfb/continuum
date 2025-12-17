import CircleColorPicker from "../../pickers/CircleColorPicker";
import CircleThicknessPicker from "../../pickers/CircleThicknessPicker.tsx";
import CustomColorPicker from "../../pickers/CustomColorPicker";
import { Continuum_Canvas } from "../../../features/CanvasApp";
import { useCurveStore } from "../../../data/store/PenStore";
import ArrayDivider from "../../misc/ArrayDivider";
import useLayoutStore from "../../../data/store/LayoutStore";

const MarkerToolsQuickOptions = () => {
  const markerSettings = useCurveStore();
  const markerColorId = useCurveStore().markerSettings.colorId;
  const thicknessId = useCurveStore().markerSettings.thicknessId;
  const setMarkerColor = useCurveStore((state) => state.setMarkerColor);
  const setMarkerThickens = useCurveStore((state) => state.setMarkerThickness);
  const toolOptionsDirection = useLayoutStore().toolOptionsDirection;

  return (
    <>
      {markerSettings.markerSettings.allThickness.map((id, ix) => {
        return (
          <CircleThicknessPicker
            action={() => {
              setMarkerThickens({
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
      {markerSettings.markerSettings.allMarkerColors.map((colorId, ix) => {
        return (
          <CircleColorPicker
            colorId={colorId}
            key={ix}
            selected={colorId === markerColorId}
            action={() => setMarkerColor({ colorId: colorId, color: "" })}
          />
        );
      })}
      <CustomColorPicker customColorId="pencilCustomColor" />
    </>
  );
};

export default MarkerToolsQuickOptions;
