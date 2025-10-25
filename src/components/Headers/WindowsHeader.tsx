import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";
import { Minus, X } from "lucide-react";

const WindowsHeader = () => {
  useEffect(() => {
    const appWindow = getCurrentWindow();

    document
      .getElementById("titlebar-minimize")
      ?.addEventListener("click", () => appWindow.minimize());
    document
      .getElementById("titlebar-maximize")
      ?.addEventListener("click", () => appWindow.toggleMaximize());
    document
      .getElementById("titlebar-close")
      ?.addEventListener("click", () => appWindow.close());
  }, []);

  return (
      <div className="flex items-center h-full ">
        <button id="titlebar-minimize" className="hover:bg-stone-700 h-full w-full px-3 cursor-pointer">
          <Minus />
        </button>
        <button id="titlebar-maximize" className="hover:bg-stone-700 h-full w-full px-3 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M4 4h16v16H4zm2 4v10h12V8z" />
          </svg>
        </button>
        <button id="titlebar-close" className="hover:bg-red-700 h-full w-full px-3 cursor-pointer" >
          <X />
        </button>
    </div>
  );
};

export default WindowsHeader;