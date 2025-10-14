import OptionButtons from "./OptionsButton";
import ToolsMenue from "./ToolsMenue";
import ToolOptions from "../ToolOptions/ToolOptions";
import useLayoutStore from "../../../data/store/LayoutStore";
import ZoomingButton from "./ZoomingButton";
import BookmakrContainer from "../../bookmark/BookMarkComponent";
function ToolLayout() {
  const layoutStore = useLayoutStore();

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
      <div className="p-1 h-full  absolute left-0 flex  items-center gap-1">
        {layoutStore.toolOptionsPosition === "left" && (
          <ToolOptions direction="vertical" />
        )}
        {layoutStore.toolMenuePosition === "left" && (
          <ToolsMenue direction="vertical" />
        )}
      </div>
      {/* RIGT */}
      <div className="p-1 h-full absolute right-0 flex  items-center gap-1">
        {layoutStore.toolOptionsPosition === "right" && (
          <ToolOptions direction="vertical" />
        )}
        {layoutStore.toolMenuePosition === "right" && (
          <ToolsMenue direction="vertical" />
        )}
      </div>

      {/* TOP */}
      <div className="p-1 w-full absolute top-0 flex flex-col items-center gap-1">
        {layoutStore.toolMenuePosition === "top" && (
          <ToolsMenue direction="horizontal" />
        )}
        {layoutStore.toolOptionsPosition === "top" && (
          <ToolOptions direction="horizontal" />
        )}
      </div>
      {/*BOTOM */}
      <div className="p-1 w-full absolute bottom-0 flex flex-col items-center gap-1">
        {layoutStore.toolOptionsPosition === "bottom" && (
          <ToolOptions direction="horizontal" />
        )}
        {layoutStore.toolMenuePosition === "bottom" && (
          <ToolsMenue direction="horizontal" />
        )}
      </div>
      <OptionButtons />
      <ZoomingButton />
      <BookmakrContainer />
    </div>
  );
}

export default ToolLayout;
