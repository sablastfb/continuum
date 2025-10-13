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
        flex 
        flex-wrap
        justify-around
        xl:justify-between
        p-2
        pointer-events-none
        top-0 left-0 right-0 items-start
        `}
    >
      <OptionButtons />
      <div className="hidden sm:flex flex-col  items-center justify-center align-middle gap-1.5   flex-wrap">
        <ToolsMenue />
        <ToolOptions />
      </div>

      <BookmakrContainer />
      <ZoomingButton />
    </div>
  );
}

export default ToolLayout;
