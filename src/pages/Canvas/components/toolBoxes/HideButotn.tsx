import { PencilRuler } from "lucide-react";
import { DefaultIconSize } from "../../data/types/CanvasConstants";

function HideQuickToolSettings(){
    return <>
    <PencilRuler size={32} className="outline-2 outline-amber-300 rounded-2xl p-1" />
    </>
}

export default HideQuickToolSettings;