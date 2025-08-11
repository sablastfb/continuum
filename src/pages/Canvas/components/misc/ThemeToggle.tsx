import { useContext, useState } from "react";
import { PrimeReactContext } from "primereact/api";
import { AppConstants } from "../../data/constants/AppConstants";
import useCanvasStore from "../../data/store/CanvasStore";

const ThemeToggle = () => {
  const { changeTheme } = useContext(PrimeReactContext)!;
  const theme = useCanvasStore().canvasSettings.theme;
  const setTheme = useCanvasStore().setTheme;
  const isLight = theme === 'light';

  const toggle = () => {
    const [nextTheme, currentTheme] =
      theme === "dark"
        ? [
            AppConstants.primeReactLightModeTheme,
            AppConstants.primeReactDarkModeTheme,
          ]
        : [
            AppConstants.primeReactDarkModeTheme,
            AppConstants.primeReactLightModeTheme,
          ];

    if (isLight) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    if (changeTheme)
      changeTheme(currentTheme, nextTheme, "theme-link", () => {
          setTheme(isLight ? 'dark':'light');
      });
  };

  return (
    <button onClick={toggle} className="bg-red-400  dark:bg-blue-900">
      Switch to {isLight ? "Light" : "Dark"}
    </button>
  );
};
export default ThemeToggle;
