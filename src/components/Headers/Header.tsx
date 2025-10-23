import CanvasHeaderOptions from "./CanvasHeaderOptions";
import ContinumLogo from "./ContinumLogo";
import WindowsHeader from "./WindowsHeader";

const ContinumHeader = () => {
  return (
    <>
      <div
        className="top-0 left-0 right-0 bg-gray-100 dark:bg-stone-800 flex items h-8 justify-between "
        data-tauri-drag-region
      >
        <div
          data-tauri-drag-region
          className="flex h-full w-full items-center "
        >
          <ContinumLogo />
          <CanvasHeaderOptions />
        </div>
        <WindowsHeader />
      </div>
    </>
  );
};

export default ContinumHeader;
