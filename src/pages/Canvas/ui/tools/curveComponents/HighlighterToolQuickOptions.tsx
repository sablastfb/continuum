import CircleColorPicker from "../../pickers/CircleColorPicker";
import CircleThicknesPicker from "../../pickers/CircleThicknesPicker";
import CustomColorPicker from "../../pickers/CustomColorPicker";
import { Continuum_Canvas } from "../../../features/CanvasApp";
import { useMarkerStore } from "../../../data/store/PenStore";


const HighlighterToolsQuickOptions = () => {
  const markerSettings = useMarkerStore();
  const markerColorId = useMarkerStore().markerColorId;
  const thicknesId = useMarkerStore().thicknesId;
  const setMarkerColor = useMarkerStore((state) => state.setMarkereColor);
  const setMarkerThickens = useMarkerStore(
    (state) => state.setmarkereThickens
  );

  return (
    <>
      {markerSettings.allThicknes.map((id, ix) => {
        return (
          <CircleThicknesPicker
            action={() => {
              setMarkerThickens({
                thicknes: Continuum_Canvas.thicknesPalet.getThicknes(id),
                thicknesId: id,
              })
            }
           }
            thicknesId={id}
            selected={thicknesId === id}
            key={ix}
          />
        );
      })}
      {markerSettings.allmarkerColors.map((colorId, ix) => {
        return (
          <CircleColorPicker
            colorId={colorId}
            key={ix}
            selected={colorId === markerColorId}
            action={() => setMarkerColor({ colorId: colorId, color: "" })
            }
          />
        );
      })}
      <CustomColorPicker customColorId="pencilCustomColor" />
    </>
  );
}

export default HighlighterToolsQuickOptions;
