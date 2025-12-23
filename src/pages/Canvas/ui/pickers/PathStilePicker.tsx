import {Circle, CircleDashed} from "lucide-react";
import {DefaultIconSize} from "../../../../constants/CanvasConstants.ts";
import {DottedLine} from "../../../../components/icons/DottedCircle.tsx";
import {useCurveStore} from "../../data/store/PenStore.ts";

const PathStilePicker = () => {
    const fillStyle = useCurveStore().penSettings.fillStyle
    const setFillStyle = useCurveStore().setFillStyle
    return <>
        <div>
            <div className="flex  items-center justify-center  hover:cursor-pointer  rounded-full gap-5">
                <div onClick={()=>setFillStyle('solid')} className={fillStyle === 'solid' ? "ring-4 ring-amber-400 rounded-full" : ""}>
                    <Circle size={DefaultIconSize}/>
                </div>
                <div onClick={()=>setFillStyle('dashed')} className={fillStyle === 'dashed' ? "ring-4 ring-amber-400 rounded-full" : ""}>
                    <CircleDashed size={DefaultIconSize}/>
                </div>
                <div  onClick={()=>setFillStyle('dotted')}  className={fillStyle === 'dotted' ? "ring-4 ring-amber-400 rounded-full" : ""}>
                    <DottedLine size={DefaultIconSize}/>
                </div>
            </div>
        </div>
    </>
}

export default PathStilePicker;