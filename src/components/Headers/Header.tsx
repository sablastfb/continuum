import CanvasHeaderOptions from "./CanvasHeaderOptions";
import ContinuumLogo from "./ContinuumLogo.tsx";
import WindowsHeader from "./WindowsHeader";

const ContinuumHeader = () => {
    return (
        <div
            className="top-0 left-0 right-0 bg-gray-100 dark:bg-stone-800 flex items h-8 justify-between"
            data-tauri-drag-region
        >
            <div
                data-tauri-drag-region
                className="flex h-full w-full items-center"
            >
                <ContinuumLogo/>
                <CanvasHeaderOptions/>
            </div>
            {'__TAURI_INTERNALS__' in window && <WindowsHeader/>}
        </div>
    );
};

export default ContinuumHeader;