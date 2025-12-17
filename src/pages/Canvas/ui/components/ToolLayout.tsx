import useLayoutStore from "../../data/store/LayoutStore";
import BookmarkContainer from "../tools/bookmarkComponents/BookMarkComponent";
import HideQuickToolSettings from "./HideButotn";
import ToolOptionsHolder from "./ToolQuickOptionsHolder";
import ToolsMenuHolder from "./ToolsMenuHolder.tsx";
import ZoomingButton from "./ZoomingComponent";

const ToolLayout = () => {
  const layoutStore = useLayoutStore();

  return (
    <div
      className={`
        absolute
        h-full
        w-hull
        pointer-events-none
        top-0 left-0 right-0 items-start
        `}
    >
      {/* LEFT */}
      <div className="p-1 h-full absolute left-0 flex  items-center gap-1 flex-row-reverse">
        {layoutStore.toolOptionsPosition === "left" && (
          <ToolOptionsHolder direction="vertical" />
        )}
        {layoutStore.toolMenuPosition === "left" && (
          <ToolsMenuHolder direction="vertical" />
        )}
      </div>
      {/* RIGT */}
      <div className="p-1 h-full absolute right-0 flex items-center gap-1 ">
        {layoutStore.toolOptionsPosition === "right" && (
          <ToolOptionsHolder direction="vertical" />
        )}
        {layoutStore.toolMenuPosition === "right" && (
          <ToolsMenuHolder direction="vertical" />
        )}
      </div>

      {/* TOP */}
      <div className="p-1 w-full absolute top-0 flex  items-center gap-1 flex-col-reverse">
        {layoutStore.toolOptionsPosition === "top" && (
          <ToolOptionsHolder direction="horizontal" />
        )}
        {layoutStore.toolMenuPosition === "top" && (
          <ToolsMenuHolder direction="horizontal" />
        )}
      </div>
      {/*BOTOM */}
      <div className="p-1 w-full absolute bottom-0 flex flex-col items-center gap-1">
        {layoutStore.toolOptionsPosition === "bottom" && (
          <ToolOptionsHolder direction="horizontal" />
        )}
        {layoutStore.toolMenuPosition === "bottom" && (
          <ToolsMenuHolder direction="horizontal" />
        )}
      </div>
      {/* <OptionButtons /> */}
      <div className={`  absolute bottom-0 left-0 m-1 flex gap-5 items-center`}>
        <ZoomingButton />
        <HideQuickToolSettings />
      </div>
      <BookmarkContainer />
    </div>
  );
};

export default ToolLayout;
