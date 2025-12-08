import { Circle, LineSquiggle } from "lucide-react";
import { useEraseStore } from "../../../data/store/EraseStore";
import { DefaultOutline } from "../../../data/constants/CanvasConstants";
import ArrayDivider from "../../misc/ArrayDivider";
import CircleThicknesPicker from "../../pickers/CircleThicknesPicker";
import useLayoutStore from "../../../data/store/LayoutStore";
import ToolOptionHeaderComponent from "../../toolBoxes/ToolOptionsHeaderComponent";
import { Continuum_Canvas } from "../../../features/CanvasApp";

const EraseToolQuickOptions = () => {
  const eraseSettings = useEraseStore();
  const eraseMethod = useEraseStore().eraseMethod;
  const thicknesId = useEraseStore().thicknesId;
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
      
      {eraseSettings.allEraseThicknes.map((id, ix) => {
        return (
          <CircleThicknesPicker
            action={() => {
              setEraseThickens({
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
    </>
  );
}

export default EraseToolQuickOptions;
