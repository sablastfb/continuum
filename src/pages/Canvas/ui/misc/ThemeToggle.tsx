import { useContext } from "react";
import { PrimeReactContext } from "primereact/api";
import { AppConstants } from "../../../../constants/AppConstants";
import { Button } from "primereact/button";
import useGlobalStore from "../../data/store/GlobalStore";

const ThemeToggle = () => {
  const { changeTheme } = useContext(PrimeReactContext)!;
  const theme = useGlobalStore().theme;
  const setTheme = useGlobalStore().setTheme;
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
