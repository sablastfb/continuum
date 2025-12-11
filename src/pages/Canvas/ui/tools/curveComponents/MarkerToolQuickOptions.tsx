import CircleColorPicker from "../../pickers/CircleColorPicker";
import CircleThicknesPicker from "../../pickers/CircleThicknesPicker";
import CustomColorPicker from "../../pickers/CustomColorPicker";
import { Continuum_Canvas } from "../../../features/CanvasApp";
import { useCurveStore } from "../../../data/store/PenStore";
import ArrayDivider from "../../misc/ArrayDivider";
import useLayoutStore from "../../../data/store/LayoutStore";

const MarkerToolsQuickOptions = () => {
  const markerSettings = useCurveStore();
  const markerColorId = useCurveStore().markerSettings.colorId;
  const thicknesId = useCurveStore().markerSettings.thicknesId;
  const setMarkerColor = useCurveStore((state) => state.setMarkerColor);
  const setMarkerThickens = useCurveStore((state) => state.setMarkerThicknes);
  const toolOptionsDirection = useLayoutStore().toolOptionsDirection;

  return (
    <>
      {markerSettings.markerSettings.allThicknes.map((id, ix) => {
        return (
          <CircleThicknesPicker
            action={() => {
              setMarkerThickens({
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
