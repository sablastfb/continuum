import ZoomingButton from "./ZoomingButton";
import OptionButtons from "./OptionsButton";
import ToolsMenue from "./ToolsMenue";
import ToolOptions from "../ToolOptions/ToolOptions";
import BookmakrContainer from "../../bookmark/BookMarkComponent";
function ToolLayout() {
  return (
    <div
      className={`
        absolute
        h-full
        w-hull
        flex 
        flex-wrap
        justify-around
        xl:justify-between
        pointer-events-none
        top-0 left-0 right-0 items-start
        `}
    >
      {/* LEFT */}
      <div className="bg-amber-100 h-full  absolute left-0">


      </div>
      {/* RIGT */}
      <div className="h-full absolute right-0 flex  items-center gap-1">
        <ToolOptions direction="vertical" />
      </div>

      {/* TOP */}
      <div className="p-1 w-full absolute top-0 flex flex-col items-center gap-1">
        <ToolsMenue direction="horizontal"/>
        <ToolOptions direction="horizontal" />
      </div>
      {/*BOTOM */}
      <div className="p-1 w-full absolute bottom-0 flex flex-col items-center gap-1">
        <ToolOptions direction="horizontal" />
        <ToolsMenue direction="horizontal" />
      </div>
      {/* <OptionButtons />
      <div className="hidden sm:flex flex-col  items-center justify-center align-middle gap-1.5   flex-wrap">
        <ToolsMenue />
      <ToolOptions />
      </div>

        <div className="bg-red-500">
          xx
        </div>

      <BookmakrContainer/>
      <ZoomingButton /> */}
    </div>
  );
}

export default ToolLayout;
