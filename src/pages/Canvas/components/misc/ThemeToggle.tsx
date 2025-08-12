import { useContext, useEffect } from "react";
import { PrimeReactContext } from "primereact/api";
import { AppConstants } from "../../data/constants/AppConstants";
import useCanvasStore from "../../data/store/CanvasStore";

import { Button } from "primereact/button";

const ThemeToggle = () => {
  const { changeTheme } = useContext(PrimeReactContext)!;
  const theme = useCanvasStore().canvasSettings.theme;
  const setTheme = useCanvasStore().setTheme;
  const isLight = theme === "light";

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

    setTheme(isLight ? "dark" : "light");
    if (isLight) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    if (changeTheme)
      changeTheme(currentTheme, nextTheme, "theme-link", () => {});
  };

  return (
    <>
      <Button
        rounded
        text
        icon={`
          ${isLight ? "pi pi-moon" : "pi pi-sun"} 
          `}
        onClick={toggle}
      />
    </>
  );
};
export default ThemeToggle;
