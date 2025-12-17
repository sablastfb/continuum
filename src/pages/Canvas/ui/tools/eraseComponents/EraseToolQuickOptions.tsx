import { Circle, LineSquiggle } from "lucide-react";
import { useEraseStore } from "../../../data/store/EraseStore";
import { DefaultOutline } from "../../../../../constants/CanvasConstants";
import ArrayDivider from "../../misc/ArrayDivider";
import CircleThicknessPicker from "../../pickers/CircleThicknessPicker.tsx";
import useLayoutStore from "../../../data/store/LayoutStore";
import ToolOptionHeaderComponent from "../../components/ToolOptionsHeaderComponent";
import { Continuum_Canvas } from "../../../features/CanvasApp";

const EraseToolQuickOptions = () => {
  const eraseSettings = useEraseStore();
  const eraseMethod = useEraseStore().eraseMethod;
  const thicknessId = useEraseStore().thicknessId;
  const setEraseMode = useEraseStore().setEraseMode;
  const setEraseThickens = useEraseStore((state) => state.setEraseThickens);
  const toolOptionsDirection = useLayoutStore().toolOptionsDirection;
  
  return (
    <>
      <ToolOptionHeaderComponent />
      <LineSquiggle
        className={`rounded-full w-7 h-7 hover:cursor-pointer ${
          eraseMethod === "strong" ? DefaultOutline : ""
        }`}
        onClick={() => {
          setEraseMode("strong");
        }}
      />
      <Circle
        className={`rounded-full w-7 h-7 hover:cursor-pointer ${
          eraseMethod === "soft" ? DefaultOutline : ""
        }`}
        onClick={() => {
          setEraseMode("soft");
        }}
      />

      <ArrayDivider direction={toolOptionsDirection} />
      
      {eraseSettings.allEraseThickness.map((id, ix) => {
        return (
          <CircleThicknessPicker
            action={() => {
              setEraseThickens({
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
    </>
  );
}

export default EraseToolQuickOptions;
