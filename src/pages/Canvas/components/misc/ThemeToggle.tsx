import { useContext } from "react";
import { PrimeReactContext } from "primereact/api";
import { AppConstants } from "../../data/constants/AppConstants";
import { Button } from "primereact/button";
import useSettingsStore from "../../data/store/SettingsStore";

const ThemeToggle = () => {
  const { changeTheme } = useContext(PrimeReactContext)!;
  const theme = useSettingsStore().theme;
  const setTheme = useSettingsStore().setTheme;
  const isLight = theme === "light";

  const toggle = () => {
    const [nextTheme, currentTheme] = isLight
      ? [
          AppConstants.primeReactDarkModeTheme,
          AppConstants.primeReactLightModeTheme,
        ]
      : [
          AppConstants.primeReactLightModeTheme,
          AppConstants.primeReactDarkModeTheme,
        ];

    setTheme(isLight ? "dark" : "light");

    if (isLight) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
