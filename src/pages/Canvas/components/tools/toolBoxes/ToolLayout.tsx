
import useLayoutStore from "../../../data/store/LayoutStore";
import BookmakrContainer from "../bookmarkComponents/BookMarkComponent";
import OptionButtons from "./OptionsButton";
import ToolOptionsComponent from "./ToolOptionsComponent";
import ToolsMenue from "./ToolsMenueComponent.";
import ZoomingButton from "./ZoomingComponent";
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
      <div className="p-1 h-full  absolute left-0 flex  items-center gap-1 flex-row-reverse">
        {layoutStore.toolOptionsPosition === "left" && (
          <ToolOptionsComponent direction="vertical" />
        )}
        {layoutStore.toolMenuePosition === "left" && (
          <ToolsMenue direction="vertical" />
        )}
      </div>
      {/* RIGT */}
      <div className="p-1 h-full absolute right-0 flex items-center gap-1 ">
        {layoutStore.toolOptionsPosition === "right" && (
          <ToolOptionsComponent direction="vertical" />
        )}
        {layoutStore.toolMenuePosition === "right" && (
          <ToolsMenue direction="vertical" />
        )}
      </div>

      {/* TOP */}
      <div className="p-1 w-full absolute top-0 flex  items-center gap-1 flex-col-reverse">
        {layoutStore.toolOptionsPosition === "top" && (
          <ToolOptionsComponent direction="horizontal" />
        )}
        {layoutStore.toolMenuePosition === "top" && (
          <ToolsMenue direction="horizontal" /> 
        )}
        
      </div>
      {/*BOTOM */}
      <div className="p-1 w-full absolute bottom-0 flex flex-col items-center gap-1">
        {layoutStore.toolOptionsPosition === "bottom" && (
          <ToolOptionsComponent direction="horizontal" />
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
